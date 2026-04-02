"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AnalyticsSettings({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()

  return (
    <Card className="p-6 bg-white shadow-xl border-2 border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">{t("분석 설정", "Analytics Settings")}</h2>
        <Button onClick={onClose} variant="ghost" size="sm">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Daily Commitment Settings */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">{t("일일 목표 설정", "Daily Goal Settings")}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("기본 문제 수", "Default questions")}</span>
              <input type="number" defaultValue={20} className="w-20 px-3 py-1 border border-slate-300 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("최소 문제 수", "Minimum questions")}</span>
              <input type="number" defaultValue={5} className="w-20 px-3 py-1 border border-slate-300 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("최대 문제 수", "Maximum questions")}</span>
              <input type="number" defaultValue={50} className="w-20 px-3 py-1 border border-slate-300 rounded" />
            </div>
          </div>
        </div>

        {/* Quality Control Settings */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">{t("품질 관리 설정", "Quality Control")}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("최소 문제당 시간", "Min. time per question")}</span>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={5} className="w-16 px-3 py-1 border border-slate-300 rounded" />
                <span className="text-slate-600">{t("초", "sec")}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("경고 평균 시간", "Warning avg. time")}</span>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={15} className="w-16 px-3 py-1 border border-slate-300 rounded" />
                <span className="text-slate-600">{t("초", "sec")}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("집중도 기준", "Focus threshold")}</span>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={80} className="w-16 px-3 py-1 border border-slate-300 rounded" />
                <span className="text-slate-600">%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("최소 완료율", "Min. completion rate")}</span>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={80} className="w-16 px-3 py-1 border border-slate-300 rounded" />
                <span className="text-slate-600">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reminder Settings */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">{t("알림 설정", "Notifications")}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("일일 알림 시간", "Daily reminder time")}</span>
              <input type="time" defaultValue="14:00" className="px-3 py-1 border border-slate-300 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("스트릭 경고", "Streak alert")}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">{t("주간 요약", "Weekly summary")}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button className="w-full bg-orange-500 hover:bg-orange-600">{t("설정 저장", "Save Settings")}</Button>
      </div>
    </Card>
  )
}
