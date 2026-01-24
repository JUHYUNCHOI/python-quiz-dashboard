"use client"

import { useState } from "react"
import { Copy, Maximize2, Check, WrapText, Sun, Moon, Type, Contrast } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CodeDisplayProps {
  code: string
  language?: string
  maxHeight?: number
  showLineNumbers?: boolean
  className?: string
}

export function CodeDisplay({
  code,
  language = "Python",
  maxHeight = 500,
  showLineNumbers = true,
  className,
}: CodeDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [wrapLines, setWrapLines] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large" | "xlarge">("medium")
  const [highContrast, setHighContrast] = useState(false)
  const [dyslexicFont, setDyslexicFont] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const lines = code.split("\n")
  const shouldScroll = lines.length > 15

  const fontSizeMap = {
    small: "text-[13px] md:text-[15px] lg:text-[17px]",
    medium: "text-[15px] md:text-[18px] lg:text-[20px]",
    large: "text-[17px] md:text-[20px] lg:text-[23px]",
    xlarge: "text-[19px] md:text-[22px] lg:text-[26px]",
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightSyntax = (line: string) => {
    const isDark = theme === "dark"

    // Keywords - bright red-orange
    let highlighted = line.replace(
      /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|yield|async|await|pass|break|continue|raise|assert|del|global|nonlocal|in|is|not|and|or)\b/g,
      `<span class="${isDark ? "text-[#FF6B6B]" : "text-[#D63031]"}">$1</span>`,
    )

    // Strings - bright green
    highlighted = highlighted.replace(
      /(["'`])((?:\\.|(?!\1).)*?)\1/g,
      `<span class="${isDark ? "text-[#51CF66]" : "text-[#00B894]"}">$1$2$1</span>`,
    )

    // Comments - medium gray
    highlighted = highlighted.replace(
      /(#.*$)/g,
      `<span class="${isDark ? "text-[#ADB5BD]" : "text-[#636E72]"}">$1</span>`,
    )

    // Built-ins (print, len, etc.) - bright purple
    highlighted = highlighted.replace(
      /\b(print|len|range|str|int|float|list|dict|set|tuple|type|isinstance|input|open|enumerate|zip|map|filter|sum|max|min|abs|round|sorted|reversed)\b/g,
      `<span class="${isDark ? "text-[#BA68C8]" : "text-[#6C5CE7]"}">$1</span>`,
    )

    // Functions - bright yellow
    highlighted = highlighted.replace(
      /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
      `<span class="${isDark ? "text-[#FFD43B]" : "text-[#FDCB6E]"}">$1</span>(`,
    )

    // Numbers - bright blue
    highlighted = highlighted.replace(
      /\b(\d+\.?\d*)\b/g,
      `<span class="${isDark ? "text-[#748FFC]" : "text-[#0984E3]"}">$1</span>`,
    )

    // True/False/None - special values
    highlighted = highlighted.replace(
      /\b(True|False|None)\b/g,
      `<span class="${isDark ? "text-[#FF6B6B]" : "text-[#D63031]"}">$1</span>`,
    )

    return highlighted
  }

  const bgColor = theme === "dark" ? "bg-[#1A1A1A]" : "bg-[#F8F9FA]"
  const headerBg = theme === "dark" ? "bg-[#0D0D0D]" : "bg-[#E9ECEF]"
  const borderColor = theme === "dark" ? "border-[#333333]" : "border-[#DEE2E6]"
  const textColor = theme === "dark" ? "text-[#E0E0E0]" : "text-[#1A1A1A]"
  const lineNumberColor = theme === "dark" ? "text-[#6B7280]" : "text-[#868E96]"
  const hoverBg = theme === "dark" ? "hover:bg-[#2D2D2D]" : "hover:bg-[#E9ECEF]"

  const CodeContent = () => (
    <div className="relative">
      {/* Header Bar */}
      <div className={cn("flex items-center justify-between border-b px-3 md:px-4 py-2.5", headerBg, borderColor)}>
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-yellow-500" />
          <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-green-500" />
          <span
            className={cn("ml-2 text-xs md:text-sm font-medium", theme === "dark" ? "text-gray-400" : "text-gray-600")}
          >
            {language}
          </span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "h-7 md:h-8 w-7 md:w-8 p-0",
              theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200",
            )}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5 md:h-4 md:w-4" />
            ) : (
              <Moon className="h-3.5 w-3.5 md:h-4 md:w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "h-7 md:h-8 w-7 md:w-8 p-0",
              theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200",
            )}
            title="Accessibility settings"
          >
            <Type className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setWrapLines(!wrapLines)}
            className={cn(
              "h-7 md:h-8 w-7 md:w-8 p-0",
              theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200",
            )}
            title={wrapLines ? "Disable line wrap" : "Enable line wrap"}
          >
            <WrapText className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className={cn(
              "h-7 md:h-8 w-7 md:w-8 p-0",
              theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200",
            )}
            title="Copy code"
          >
            {copied ? <Check className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <Copy className="h-3.5 w-3.5 md:h-4 md:w-4" />}
          </Button>
          {!isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className={cn(
                "h-7 md:h-8 w-7 md:w-8 p-0",
                theme === "dark"
                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200",
              )}
              title="Expand fullscreen"
            >
              <Maximize2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </Button>
          )}
        </div>
      </div>

      {showSettings && (
        <div className={cn("border-b p-3 space-y-2", headerBg, borderColor)}>
          <div className="text-xs font-semibold mb-2 text-gray-600">Accessibility Settings</div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize("small")}
              className={cn("text-xs", fontSize === "small" && "bg-orange-100 border-orange-300")}
            >
              Small
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize("medium")}
              className={cn("text-xs", fontSize === "medium" && "bg-orange-100 border-orange-300")}
            >
              Medium
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize("large")}
              className={cn("text-xs", fontSize === "large" && "bg-orange-100 border-orange-300")}
            >
              Large
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize("xlarge")}
              className={cn("text-xs", fontSize === "xlarge" && "bg-orange-100 border-orange-300")}
            >
              X-Large
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHighContrast(!highContrast)}
              className={cn("text-xs flex items-center gap-1", highContrast && "bg-orange-100 border-orange-300")}
            >
              <Contrast className="h-3 w-3" />
              High Contrast
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDyslexicFont(!dyslexicFont)}
              className={cn("text-xs", dyslexicFont && "bg-orange-100 border-orange-300")}
            >
              Dyslexia Font
            </Button>
          </div>
        </div>
      )}

      {/* Code Content */}
      <div
        className={cn("overflow-auto", bgColor, !isExpanded && shouldScroll && "max-h-[400px] md:max-h-[500px]")}
        style={!isExpanded && !shouldScroll ? { maxHeight: `${maxHeight}px` } : undefined}
      >
        <div className="relative">
          {/* Fade indicator for horizontal scroll */}
          {!wrapLines && (
            <div
              className={cn(
                "pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l to-transparent",
                theme === "dark" ? "from-[#1A1A1A]" : "from-[#F8F9FA]",
              )}
            />
          )}

          <pre className={cn("p-4 md:p-6", wrapLines ? "whitespace-pre-wrap break-words" : "whitespace-pre")}>
            <code
              className={cn(
                "font-mono leading-[2.0] tracking-[0.5px] font-medium",
                fontSizeMap[fontSize],
                dyslexicFont && "font-['OpenDyslexic',monospace]",
                highContrast && "font-semibold",
              )}
            >
              {lines.map((line, index) => (
                <div key={index} className={cn("group transition-colors", hoverBg)}>
                  {showLineNumbers && (
                    <span
                      className={cn(
                        "inline-block w-10 md:w-12 text-right pr-4 md:pr-5 select-none",
                        lineNumberColor,
                        fontSizeMap[fontSize],
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                  <span className={textColor} dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || " " }} />
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Line count indicator */}
      {shouldScroll && !isExpanded && (
        <div
          className={cn(
            "border-t px-3 md:px-4 py-1.5 text-xs text-center",
            headerBg,
            borderColor,
            theme === "dark" ? "text-gray-400" : "text-gray-600",
          )}
        >
          {lines.length} lines • Scroll to see more
        </div>
      )}

      {copied && (
        <div className="absolute top-14 right-4 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg animate-fade-in">
          Copied!
        </div>
      )}
    </div>
  )

  return (
    <>
      <div className={cn("overflow-hidden rounded-xl border shadow-lg", borderColor, className)}>
        <CodeContent />
      </div>

      {/* Fullscreen Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={cn("w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-xl border-2 shadow-2xl", borderColor)}
          >
            <div className={cn("flex items-center justify-between border-b px-4 py-3", headerBg, borderColor)}>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className={cn("ml-2 text-sm font-medium", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                  {language}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className={
                  theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }
              >
                Close (Esc)
              </Button>
            </div>
            <div className={cn("overflow-auto max-h-[calc(90vh-60px)]", bgColor)}>
              <pre className="p-6">
                <code className={cn("font-mono leading-[2.0] tracking-[0.5px] font-medium text-[20px]", textColor)}>
                  {lines.map((line, index) => (
                    <div key={index} className={cn("group transition-colors", hoverBg)}>
                      {showLineNumbers && (
                        <span className={cn("inline-block w-12 text-right pr-4 select-none", lineNumberColor)}>
                          {index + 1}
                        </span>
                      )}
                      <span dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || " " }} />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
