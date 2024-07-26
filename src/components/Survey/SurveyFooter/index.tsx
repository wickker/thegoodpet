import { Button } from '@/components/common'
import { mc } from '@/utils/functions/common'

type SurveyFooterProps = {
  customNextButton?: JSX.Element
  hideBackButton?: boolean
  hideNextButton?: boolean
  onNext?: () => void
  onBack?: () => void
}

export default function SurveyFooter({
  customNextButton,
  hideBackButton = false,
  hideNextButton = false,
  onNext = () => {},
  onBack = () => {},
}: SurveyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 grid grid-cols-2 gap-3 bg-white p-[15px] md:relative md:mt-5 md:bg-transparent md:px-0">
      {!hideBackButton && (
        <div className={mc(hideNextButton && 'col-span-2')}>
          <Button className="w-full md:w-32" onClick={onBack}>
            Back
          </Button>
        </div>
      )}

      {!hideNextButton && (
        <div
          className={mc(
            'flex w-full justify-end',
            hideBackButton && 'col-span-2',
          )}
        >
          {customNextButton ? (
            customNextButton
          ) : (
            <Button className="w-full md:w-32" onClick={onNext}>
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
