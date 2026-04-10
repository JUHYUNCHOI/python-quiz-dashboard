window.renderSolutionsCodeTab = function(el, prob) {
    const wrapper = document.createElement('div');
    const tabBar = document.createElement('div');
    tabBar.className = 'approach-tabs';

    prob.solutions.forEach((sol, i) => {
        const tab = document.createElement('button');
        tab.className = 'approach-tab' + (i === 0 ? ' active' : '');
        tab.dataset.index = i;
        tab.innerHTML =
            '<span class="approach-num">' + (i + 1) + '</span>' +
            '<span>' + sol.approach + '</span>' +
            '<span class="approach-complexity">' + sol.timeComplexity + '</span>';
        tab.addEventListener('click', () => showApproach(i));
        tabBar.appendChild(tab);
    });
    wrapper.appendChild(tabBar);
    tabBar.style.display = 'none';

    const panel = document.createElement('div');
    panel.className = 'approach-panel';
    wrapper.appendChild(panel);

    function langClass(l) { return l === 'cpp' ? 'cpp' : l; }

    function highlightNewLines(codeEl, newLines) {
        if (!newLines || !newLines.length) return;
        var html = codeEl.innerHTML;
        var lines = html.split('\n');
        codeEl.innerHTML = lines.map(function(line, i) {
            if (newLines.indexOf(i + 1) !== -1) {
                return '<mark class="code-line-new">' + line + '</mark>';
            }
            return line;
        }).join('\n');
    }

    function showApproach(idx) {
        const sol = prob.solutions[idx];
        tabBar.querySelectorAll('.approach-tab').forEach((t, i) => {
            t.classList.toggle('active', i === idx);
        });
        panel.innerHTML = '';

        // 설명
        if (sol.description) {
            const desc = document.createElement('div');
            desc.className = 'approach-desc';
            desc.innerHTML = '<span>' + sol.description + '</span>';
            panel.appendChild(desc);
        }

        // 복잡도 뱃지
        const meta = document.createElement('div');
        meta.className = 'approach-meta';
        meta.innerHTML =
            '<span class="approach-meta-badge time">⏱ ' + sol.timeComplexity + '</span>' +
            '<span class="approach-meta-badge space">💾 ' + sol.spaceComplexity + '</span>';
        panel.appendChild(meta);

        // 언어 셀렉터
        const langs = Object.keys(sol.templates);
        const langNames = { python: 'Python', cpp: 'C++' };

        const controls = document.createElement('div');
        controls.style.cssText = 'display:flex;gap:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap;';
        controls.innerHTML =
            '<select class="lang-select" style="padding:6px 12px;border:1px solid var(--border);border-radius:8px;font-size:0.9rem;background:var(--bg2);color:var(--text);font-family:inherit;">' +
            langs.map(l => '<option value="' + l + '">' + (langNames[l] || l) + '</option>').join('') +
            '</select>';
        panel.appendChild(controls);
        const select = controls.querySelector('.lang-select');

        // 전역 언어 설정에 맞춰 초기값
        var initLang = (langs.indexOf(window._algoLang) !== -1) ? window._algoLang : langs[0];
        if (select.value !== initLang) select.value = initLang;

        // === Progressive code step mode ===
        if (sol.codeSteps) {
            let currentLang = (langs.indexOf(window._algoLang) !== -1) ? window._algoLang : langs[0];
            let currentStep = -1;
            let isFullView = false;

            // 위쪽 스텝 컨트롤 — controls 바 안에 오른쪽 정렬
            const stepCtrlTop = document.createElement('div');
            stepCtrlTop.style.cssText = 'display:flex;gap:6px;align-items:center;margin-left:auto;';
            stepCtrlTop.innerHTML =
                '<button class="btn code-step-btn cs-prev" disabled style="font-size:0.8rem;padding:4px 10px;">← 이전</button>' +
                '<span class="code-step-counter" style="font-size:0.82rem;font-weight:600;color:var(--accent);min-width:50px;text-align:center;">시작 전</span>' +
                '<button class="btn btn-primary code-step-btn cs-next pulse-hint" style="font-size:0.8rem;padding:4px 10px;">다음 →</button>';
            controls.appendChild(stepCtrlTop);
            const topPrev = stepCtrlTop.querySelector('.cs-prev');
            const topNext = stepCtrlTop.querySelector('.cs-next');
            const topCounter = stepCtrlTop.querySelector('.code-step-counter');

            const stepDesc = document.createElement('div');
            stepDesc.className = 'code-step-desc';
            stepDesc.textContent = '▶ 다음 버튼을 눌러 코드를 단계별로 확인하세요';
            panel.appendChild(stepDesc);

            const explainerArea = document.createElement('div');
            explainerArea.className = 'code-step-explainer';
            explainerArea.style.display = 'none';
            panel.appendChild(explainerArea);

            const codeBlock = document.createElement('div');
            codeBlock.className = 'code-block';
            codeBlock.innerHTML =
                '<div class="code-block-header">' +
                    '<div class="code-block-dots"><span></span><span></span><span></span></div>' +
                    '<span class="code-block-title">solution.' + (currentLang === 'python' ? 'py' : 'cpp') + '</span>' +
                '</div>' +
                '<pre><code></code></pre>';
            codeBlock.style.display = 'none';
            panel.appendChild(codeBlock);
            const codeEl = codeBlock.querySelector('code');
            const codeTitle = codeBlock.querySelector('.code-block-title');

            // 아래쪽 스텝 컨트롤 — 오른쪽 정렬 sticky
            const stepCtrlBot = document.createElement('div');
            stepCtrlBot.style.cssText = 'display:flex;gap:6px;align-items:center;justify-content:flex-end;position:sticky;bottom:12px;z-index:100;margin-top:12px;padding:8px 0;';
            stepCtrlBot.innerHTML =
                '<button class="btn code-step-btn cs-prev" disabled style="font-size:0.8rem;padding:4px 10px;">← 이전</button>' +
                '<span class="code-step-counter" style="font-size:0.82rem;font-weight:600;color:var(--accent);min-width:50px;text-align:center;">시작 전</span>' +
                '<button class="btn btn-primary code-step-btn cs-next" style="font-size:0.8rem;padding:4px 10px;">다음 →</button>';
            panel.appendChild(stepCtrlBot);
            const botPrev = stepCtrlBot.querySelector('.cs-prev');
            const botNext = stepCtrlBot.querySelector('.cs-next');
            const botCounter = stepCtrlBot.querySelector('.code-step-counter');

            // aliases for renderStep compatibility
            const prevBtn = topPrev;
            const nextBtn = topNext;
            const counter = topCounter;

            const fullViewBtn = document.createElement('button');
            fullViewBtn.className = 'code-fullview-btn';
            fullViewBtn.textContent = '전체 코드 보기';
            panel.appendChild(fullViewBtn);

            function getSteps() {
                return (sol.codeSteps[currentLang]) || [];
            }

            function syncControls() {
                const steps = getSteps();
                [[topPrev, topNext, topCounter], [botPrev, botNext, botCounter]].forEach(function(trio) {
                    trio[0].disabled = currentStep < 0;
                    trio[1].disabled = currentStep >= steps.length - 1;
                    if (currentStep < 0) {
                        trio[2].textContent = '시작 전';
                    } else {
                        trio[2].textContent = 'Step ' + (currentStep + 1) + ' / ' + steps.length;
                    }
                });
            }

            function renderStep() {
                const steps = getSteps();
                syncControls();

                if (currentStep < 0) {
                    stepDesc.textContent = '▶ 다음 버튼을 눌러 코드를 단계별로 확인하세요';
                    explainerArea.style.display = 'none';
                    codeBlock.style.display = 'none';
                    return;
                }

                const step = steps[currentStep];
                stepDesc.innerHTML = '<span class="step-desc-title">' + step.title + '</span><span class="step-desc-body">' + step.desc.replace(/\n/g, '<br>') + '</span>';

                // Explanation card
                if (step.explanation) {
                    explainerArea.innerHTML = step.explanation;
                    explainerArea.style.display = 'block';
                } else {
                    explainerArea.style.display = 'none';
                }

                // Accumulate code — detect if steps use full-code or fragment style
                const codeStepsWithCode = steps.slice(0, currentStep + 1).filter(s => s.code);
                let accumulated = '';
                if (codeStepsWithCode.length >= 2 && codeStepsWithCode[1].code.includes(codeStepsWithCode[0].code)) {
                    // Full-code style: each step has complete code, just use the last one
                    accumulated = codeStepsWithCode[codeStepsWithCode.length - 1].code;
                } else {
                    // Fragment style: join all fragments
                    accumulated = codeStepsWithCode.map(s => s.code).join('\n\n');
                }

                if (accumulated) {
                    codeBlock.style.display = 'block';
                    codeEl.textContent = accumulated;
                    codeEl.className = 'language-' + langClass(currentLang);
                    codeEl.removeAttribute('data-highlighted');
                    if (window.hljs) hljs.highlightElement(codeEl);

                    // Calculate new lines
                    if (step.code) {
                        const isFullStyle = codeStepsWithCode.length >= 2 && codeStepsWithCode[1].code.includes(codeStepsWithCode[0].code);
                        let prevCount = 0;
                        if (isFullStyle) {
                            // Full-code: compare with previous step's full code
                            const prevSteps = steps.slice(0, currentStep).filter(s => s.code);
                            prevCount = prevSteps.length > 0 ? prevSteps[prevSteps.length - 1].code.split('\n').length : 0;
                        } else {
                            const prevFrags = steps.slice(0, currentStep).filter(s => s.code).map(s => s.code);
                            const prevAcc = prevFrags.join('\n\n');
                            prevCount = prevAcc ? prevAcc.split('\n').length : 0;
                        }
                        const totalCount = accumulated.split('\n').length;
                        const startNew = prevCount > 0 ? prevCount + 1 : 1;
                        const newLines = [];
                        for (let ln = startNew; ln <= totalCount; ln++) newLines.push(ln);
                        highlightNewLines(codeEl, newLines);
                    }
                } else {
                    codeBlock.style.display = 'none';
                }
            }

            function doNext() {
                const steps = getSteps();
                if (currentStep >= steps.length - 1) return;
                topNext.classList.remove('pulse-hint');
                botNext.classList.remove('pulse-hint');
                currentStep++;
                if (isFullView) {
                    isFullView = false;
                    fullViewBtn.textContent = '전체 코드 보기';
                    stepCtrlTop.style.display = 'flex';
                    stepCtrlBot.style.display = 'flex';
                    stepDesc.style.display = 'flex';
                }
                renderStep();
                setTimeout(() => {
                    if (codeBlock.style.display === 'none') return;
                    var cb = codeBlock.getBoundingClientRect();
                    if (cb.bottom > window.innerHeight * 0.6) {
                        window.scrollBy({ top: cb.bottom - window.innerHeight * 0.6, behavior: 'smooth' });
                    }
                }, 50);
            }
            function doPrev() {
                if (currentStep < 0) return;
                currentStep--;
                renderStep();
            }
            topNext.addEventListener('click', doNext);
            botNext.addEventListener('click', doNext);
            topPrev.addEventListener('click', doPrev);
            botPrev.addEventListener('click', doPrev);

            fullViewBtn.addEventListener('click', () => {
                if (isFullView) {
                    isFullView = false;
                    fullViewBtn.textContent = '전체 코드 보기';
                    stepCtrlTop.style.display = 'flex'; stepCtrlBot.style.display = 'flex';
                    stepDesc.style.display = 'flex';
                    renderStep();
                } else {
                    isFullView = true;
                    fullViewBtn.textContent = '단계별 보기';
                    explainerArea.style.display = 'none';
                    codeBlock.style.display = 'block';
                    codeEl.textContent = sol.templates[currentLang] || '';
                    codeEl.className = 'language-' + langClass(currentLang);
                    codeEl.removeAttribute('data-highlighted');
                    if (window.hljs) hljs.highlightElement(codeEl);
                    stepCtrlTop.style.display = 'none'; stepCtrlBot.style.display = 'none';
                    stepDesc.style.display = 'none';
                }
            });

            select.addEventListener('change', () => {
                currentLang = select.value;
                if (window._setAlgoLang) window._setAlgoLang(currentLang);
                currentStep = -1;
                isFullView = false;
                fullViewBtn.textContent = '전체 코드 보기';
                stepCtrlTop.style.display = 'flex'; stepCtrlBot.style.display = 'flex';
                stepDesc.style.display = 'flex';
                nextBtn.classList.add('pulse-hint');
                var extMap = { python: 'py', cpp: 'cpp' };
                if (codeTitle) codeTitle.textContent = 'solution.' + (extMap[currentLang] || currentLang);

                if (!sol.codeSteps[currentLang]) {
                    stepCtrlTop.style.display = 'none'; stepCtrlBot.style.display = 'none';
                    stepDesc.style.display = 'none';
                    explainerArea.style.display = 'none';
                    codeBlock.style.display = 'block';
                    codeEl.textContent = sol.templates[currentLang] || '// 이 언어의 풀이가 없습니다.';
                    codeEl.className = 'language-' + langClass(currentLang);
                    codeEl.removeAttribute('data-highlighted');
                    if (window.hljs) hljs.highlightElement(codeEl);
                    fullViewBtn.style.display = 'none';
                } else {
                    fullViewBtn.style.display = 'block';
                    renderStep();
                }
            });

            if (!sol.codeSteps[currentLang]) {
                stepCtrlTop.style.display = 'none'; stepCtrlBot.style.display = 'none';
                stepDesc.style.display = 'none';
                codeBlock.style.display = 'block';
                codeEl.textContent = sol.templates[currentLang] || '';
                codeEl.className = 'language-' + langClass(currentLang);
                codeEl.removeAttribute('data-highlighted');
                if (window.hljs) hljs.highlightElement(codeEl);
                fullViewBtn.style.display = 'none';
            } else {
                renderStep();
            }

        } else {
            // === Fallback: full code display ===
            const codeBlock = document.createElement('div');
            codeBlock.className = 'code-block';
            var extMap2 = { python: 'py', cpp: 'cpp' };
            codeBlock.innerHTML =
                '<div class="code-block-header">' +
                    '<div class="code-block-dots"><span></span><span></span><span></span></div>' +
                    '<span class="code-block-title">solution.' + (extMap2[initLang] || initLang) + '</span>' +
                '</div>' +
                '<pre><code></code></pre>';
            panel.appendChild(codeBlock);

            const codeEl = codeBlock.querySelector('code');
            const codeTitle2 = codeBlock.querySelector('.code-block-title');
            function showCode(lang) {
                codeEl.textContent = sol.templates[lang] || '// 이 언어의 풀이가 없습니다.';
                codeEl.className = 'language-' + langClass(lang);
                codeEl.removeAttribute('data-highlighted');
                if (window.hljs) hljs.highlightElement(codeEl);
                if (codeTitle2) codeTitle2.textContent = 'solution.' + (extMap2[lang] || lang);
            }
            select.addEventListener('change', () => {
                if (window._setAlgoLang) window._setAlgoLang(select.value);
                showCode(select.value);
            });
            showCode(initLang);
        }
    }

    // 최적 풀이를 메인으로 표시 (마지막 solution)
    var mainIdx = prob.solutions.length - 1;
    showApproach(mainIdx);

    // 나머지(브루트포스 등)를 접힌 참고 섹션으로 추가
    for (var ri = 0; ri < mainIdx; ri++) {
        (function(refSol) {
            var details = document.createElement('details');
            details.className = 'brute-ref';

            var summary = document.createElement('summary');
            summary.className = 'brute-ref-summary';
            summary.innerHTML =
                '<span class="brute-ref-icon">📝</span>' +
                '<span class="brute-ref-label">' + refSol.approach + ' 코드 참고</span>' +
                '<span class="brute-ref-badge">' + refSol.timeComplexity + '</span>';
            details.appendChild(summary);

            var refContent = document.createElement('div');
            refContent.className = 'brute-ref-content';

            if (refSol.description) {
                var desc = document.createElement('p');
                desc.className = 'brute-ref-desc';
                desc.innerHTML = '<span>' + refSol.description + '</span>';
                refContent.appendChild(desc);
            }

            var refMeta = document.createElement('div');
            refMeta.className = 'approach-meta';
            refMeta.innerHTML =
                '<span class="approach-meta-badge time">⏱ ' + refSol.timeComplexity + '</span>' +
                '<span class="approach-meta-badge space">💾 ' + refSol.spaceComplexity + '</span>';
            refContent.appendChild(refMeta);

            // 언어 셀렉터
            var refLangs = Object.keys(refSol.templates);
            var langNamesRef = { python: 'Python', cpp: 'C++' };
            var refSelect = document.createElement('select');
            refSelect.className = 'lang-select';
            refSelect.style.cssText = 'padding:6px 12px;border:1px solid var(--border);border-radius:8px;font-size:0.9rem;background:var(--bg2);color:var(--text);font-family:inherit;margin-bottom:8px;';
            refLangs.forEach(function(l) {
                var opt = document.createElement('option');
                opt.value = l;
                opt.textContent = langNamesRef[l] || l;
                refSelect.appendChild(opt);
            });
            // 전역 언어 설정에 맞춰 초기값
            var refInitLang = (refLangs.indexOf(window._algoLang) !== -1) ? window._algoLang : refLangs[0];
            if (refSelect.value !== refInitLang) refSelect.value = refInitLang;
            refContent.appendChild(refSelect);

            // 코드 블록
            var refCodeBlock = document.createElement('div');
            refCodeBlock.className = 'code-block';
            var extMap = { python: 'py', cpp: 'cpp' };
            refCodeBlock.innerHTML =
                '<div class="code-block-header">' +
                    '<div class="code-block-dots"><span></span><span></span><span></span></div>' +
                    '<span class="code-block-title">brute.' + (extMap[refInitLang] || refInitLang) + '</span>' +
                '</div>' +
                '<pre><code></code></pre>';
            refContent.appendChild(refCodeBlock);

            var refCodeEl = refCodeBlock.querySelector('code');
            var refCodeTitle = refCodeBlock.querySelector('.code-block-title');

            function showRefCode(lang) {
                refCodeEl.textContent = refSol.templates[lang] || '';
                refCodeEl.className = 'language-' + langClass(lang);
                refCodeEl.removeAttribute('data-highlighted');
                if (window.hljs) hljs.highlightElement(refCodeEl);
                if (refCodeTitle) refCodeTitle.textContent = 'brute.' + (extMap[lang] || lang);
            }

            refSelect.addEventListener('change', function() {
                if (window._setAlgoLang) window._setAlgoLang(refSelect.value);
                showRefCode(refSelect.value);
            });

            // 열릴 때 코드 하이라이팅 (lazy)
            var refInited = false;
            details.addEventListener('toggle', function() {
                if (details.open && !refInited) {
                    refInited = true;
                    showRefCode(refInitLang);
                }
            });

            details.appendChild(refContent);
            wrapper.appendChild(details);
        })(prob.solutions[ri]);
    }

    el.appendChild(wrapper);
};
