import { Survey } from '@/components/Survey'
import { SurveyProvider } from '@/contexts'

export default function SurveyPage() {
  return (
    <SurveyProvider>
      <div className="min-h-[calc(100dvh-122px)]">
        <div className="mx-auto max-w-[800px] px-[15px] pt-8">
          <Survey />
        </div>
      </div>
    </SurveyProvider>
  )
}
