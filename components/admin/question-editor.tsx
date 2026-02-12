"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { X, Sparkles, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QuestionEditorProps {
  question: any
  onClose: () => void
  onSave: (question: any) => void
}

export function QuestionEditor({ question, onClose, onSave }: QuestionEditorProps) {
  const [questionText, setQuestionText] = useState(question?.question || "")
  const [options, setOptions] = useState<string[]>(question?.options || ["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer || 0)
  const [difficulty, setDifficulty] = useState(question?.difficulty || "초급")
  const [category, setCategory] = useState(question?.category || "")
  const [explanation, setExplanation] = useState(question?.explanation || "")
  const [showPreview, setShowPreview] = useState(false)

  const handleSave = () => {
    onSave({
      ...question,
      question: questionText,
      options,
      correctAnswer,
      difficulty,
      category,
      explanation,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{question?.id ? "문제 수정" : "새 문제 만들기"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">문제 내용</label>
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="문제를 입력하세요. 코드 블록은 백틱(```)으로 감싸주세요."
              className="min-h-[120px] font-mono text-sm"
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">선택지 (정답을 선택하세요)</label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex gap-3">
                  <Button
                    type="button"
                    variant={correctAnswer === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCorrectAnswer(index)}
                    className={correctAnswer === index ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {index + 1}
                  </Button>
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options]
                      newOptions[index] = e.target.value
                      setOptions(newOptions)
                    }}
                    placeholder={`선택지 ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">난이도</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="초급">초급</SelectItem>
                  <SelectItem value="중급">중급</SelectItem>
                  <SelectItem value="고급">고급</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">카테고리</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="변수와 데이터 타입">변수와 데이터 타입</SelectItem>
                  <SelectItem value="조건문과 반복문">조건문과 반복문</SelectItem>
                  <SelectItem value="함수와 모듈">함수와 모듈</SelectItem>
                  <SelectItem value="리스트와 딕셔너리">리스트와 딕셔너리</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">해설</label>
            <Textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="정답에 대한 설명을 입력하세요"
              className="min-h-[80px]"
            />
          </div>

          {/* AI Generate Similar */}
          <Card className="p-4 bg-gradient-to-r from-mint-50 to-lavender-50 border-mint-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 mb-1">유사 문제 자동 생성</p>
                <p className="text-sm text-gray-600">AI가 이 문제와 비슷한 문제를 자동으로 만들어드려요</p>
              </div>
              <Button variant="outline" className="border-mint-500 text-mint-700 bg-transparent">
                <Sparkles className="h-4 w-4 mr-2" />
                생성하기
              </Button>
            </div>
          </Card>

          {/* Preview Toggle */}
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? "미리보기 닫기" : "미리보기"}
          </Button>

          {/* Preview */}
          {showPreview && (
            <Card className="p-6 bg-gray-50">
              <h3 className="font-bold text-gray-900 mb-4">미리보기</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-900 whitespace-pre-wrap">{questionText}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{category}</Badge>
                    <Badge
                      variant="outline"
                      className={
                        difficulty === "초급"
                          ? "border-green-500 text-green-700"
                          : difficulty === "중급"
                            ? "border-orange-500 text-orange-700"
                            : "border-red-500 text-red-700"
                      }
                    >
                      {difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        correctAnswer === index ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                {explanation && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 mb-1">해설</p>
                    <p className="text-sm text-blue-800">{explanation}</p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
            저장하기
          </Button>
        </div>
      </Card>
    </div>
  )
}
