# Coderin Infrastructure

Piston 코드 실행 서버 (DigitalOcean 드롭릿) 설정 백업.

## 서버 정보

- **IP:** 168.144.96.207
- **도메인:** 168-144-96-207.sslip.io (sslip.io 무료 DNS)
- **리전:** Singapore (SGP1)
- **사양:** 1 vCPU / 1GB RAM / 25GB SSD ($6/월)
- **OS:** Ubuntu 24.04 LTS

## 파일

- `Caddyfile` — Caddy 설정 (HTTPS + Bearer 인증 + rate limit + CORS)
  - ⚠️ `REPLACE_WITH_BEARER_KEY` placeholder 있음. 복구 시 실제 키로 교체 필요.
- `docker-compose.yaml` — Piston 컨테이너 설정 (리소스 제한 포함)

## 드롭릿 재구축 시 복구 절차

드롭릿이 죽거나 새로 만들어야 할 때:

### 1. DigitalOcean에서 새 드롭릿 생성
- Ubuntu 24.04 LTS
- Singapore 리전
- $6/월 플랜 (1GB RAM 기본형)
- SSH 키 등록

### 2. 기본 도구 설치
```bash
ssh root@<새IP>
apt update && apt upgrade -y
apt install -y docker.io docker-compose-v2 ufw fail2ban unattended-upgrades
```

### 3. Caddy 설치
```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy
caddy add-package github.com/mholt/caddy-ratelimit
```

### 4. Piston 디렉토리 설정
```bash
mkdir -p ~/piston/data/piston/packages
```

### 5. 이 repo의 설정 파일 복사
```bash
# 맥에서 (또는 드롭릿에서 scp 받아서)
scp infra/Caddyfile root@<새IP>:/etc/caddy/Caddyfile
scp infra/docker-compose.yaml root@<새IP>:~/piston/docker-compose.yaml
```

### 6. 새 Bearer 키 생성 후 Caddyfile 교체
```bash
# 드롭릿에서
NEW_KEY=$(openssl rand -hex 32)
echo "새 키: $NEW_KEY"  # 나중에 Vercel 환경변수에도 넣어야 하므로 메모
sed -i "s|REPLACE_WITH_BEARER_KEY|$NEW_KEY|" /etc/caddy/Caddyfile
```

### 7. 새 IP로 도메인 부분 교체
```bash
# IP 주소가 바뀌었으면 Caddyfile의 "168-144-96-207.sslip.io" 부분을 새 IP의 sslip.io 도메인으로 교체
# 예: 새 IP가 123.45.67.89 면 → 123-45-67-89.sslip.io
NEW_IP_DOMAIN="<새IP를 하이픈으로>.sslip.io"
sed -i "s|168-144-96-207.sslip.io|$NEW_IP_DOMAIN|" /etc/caddy/Caddyfile
```

### 8. 방화벽 설정
```bash
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'
ufw --force enable
```

### 9. fail2ban 설정
```bash
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5
backend = systemd

[sshd]
enabled = true
EOF
systemctl enable --now fail2ban
```

### 10. 자동 보안 업데이트
```bash
dpkg-reconfigure -plow unattended-upgrades  # Yes 선택
```

### 11. 서비스 시작
```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
cd ~/piston && docker compose up -d
```

### 12. 테스트
```bash
curl -X POST https://<도메인>/api/v2/execute \
  -H "Authorization: Bearer <새키>" \
  -H "Content-Type: application/json" \
  -d '{"language":"c++","version":"10.2.0","files":[{"name":"main.cpp","content":"#include<iostream>\nint main(){std::cout<<\"OK\";}"}]}'
```

→ `"stdout":"OK"` 나오면 복구 완료.

### 13. Vercel 환경변수 업데이트
Vercel 대시보드 → Coderin → Settings → Environment Variables:
- `NEXT_PUBLIC_PISTON_URL` → `https://<새도메인>/api/v2/execute`
- `NEXT_PUBLIC_PISTON_KEY` → 새 키

→ Redeploy

### 14. 로컬 `.env.local` 도 동일하게 업데이트

---

## 키 교체만 필요한 경우 (드롭릿은 살아있지만 키 유출 의심)

1. 드롭릿에서 새 키 생성 + Caddyfile 교체:
   ```bash
   NEW_KEY=$(openssl rand -hex 32)
   sed -i "s|Bearer [a-f0-9]\{64\}|Bearer $NEW_KEY|" /etc/caddy/Caddyfile
   systemctl reload caddy
   echo "새 키: $NEW_KEY"
   ```
2. Vercel 환경변수 `NEXT_PUBLIC_PISTON_KEY` 교체 → Redeploy
3. 로컬 `.env.local` 교체

---

## 운영 치트시트

```bash
# 서비스 상태
systemctl status caddy
docker ps | grep piston_api

# 재시작
systemctl reload caddy
cd ~/piston && docker compose restart

# 로그
journalctl -u caddy -n 50 --no-pager
docker compose logs --tail 50

# Piston 업데이트 (새 SHA로 핀 필요)
docker compose pull
docker inspect piston_api --format '{{.Image}}'  # 새 SHA 확인 → docker-compose.yaml 업데이트
docker compose up -d

# fail2ban 차단 목록
fail2ban-client status sshd

# 리소스
docker stats piston_api  # Ctrl+C
free -h
df -h
```
