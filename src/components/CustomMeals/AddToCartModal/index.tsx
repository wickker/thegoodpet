import { PropsWithChildren } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsXLg } from 'react-icons/bs'
import { ButtonSubmitFormAction, DeliveryDatePicker } from '@/components/common'
import { SubscriptionOption } from '@/components/CustomMeals'
import { SHOPIFY_CUSTOM_MEAL_SELLING_PLANS } from '@/utils/constants/common'
import { mc } from '@/utils/functions/common'

type AddToCartModalProps = {
  isVisible: boolean
  onClose: () => void
  productId: string
  submitAction: (payload: FormData) => void
}

export default function AddToCartModal({
  isVisible,
  onClose,
  productId,
  submitAction,
}: AddToCartModalProps) {
  return (
    <MobileBottomDrawer isVisible={isVisible} onClose={onClose}>
      <form className="p-[15px]" action={submitAction}>
        <input type="hidden" value={productId} name="merchandiseId" />

        <div className="mb-3 flex justify-between text-lg">
          <p>Select a purchase option</p>
          <button onClick={onClose} type="button">
            <BsXLg />
          </button>
        </div>

        <div className="grid grid-rows-3 gap-2">
          <SubscriptionOption title="One-time purchase" />
          {SHOPIFY_CUSTOM_MEAL_SELLING_PLANS.map((sellingPlanDetails) => (
            <SubscriptionOption
              key={sellingPlanDetails.value}
              {...sellingPlanDetails}
            />
          ))}
        </div>

        <div className="mt-6 grid gap-3">
          <p className="text-lg">Select a delivery date</p>
          <DeliveryDatePicker />
          <div className="space-y-3 text-xs text-neutral-500">
            <p>
              For subscriptions, this will be when the first delivery occurs and
              subsequent deliveries will occur at the interval selected.
            </p>

            <p>
              Have any questions?{' '}
              <a
                href="mailto:Hello@thebonpet.com"
                className="text-primary underline"
              >
                Request for support
              </a>
              .
            </p>
          </div>
        </div>

        <ButtonSubmitFormAction className="mt-3 w-full">
          Add to cart
        </ButtonSubmitFormAction>
      </form>
    </MobileBottomDrawer>
  )
}

type MobileBottomDrawerProps = {
  isVisible: boolean
  onClose: () => void
} & PropsWithChildren

function MobileBottomDrawer({
  isVisible,
  onClose,
  children,
}: MobileBottomDrawerProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 md:hidden">
      <div
        className={mc(
          'transition-bg-opacity h-full w-full bg-black bg-opacity-0 duration-300',
          isVisible && 'pointer-events-auto bg-opacity-70',
        )}
        onClick={onClose}
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="pointer-events-auto fixed bottom-0 left-0 right-0 h-min rounded-t-lg bg-background"
            initial={{ bottom: '-100%' }}
            animate={{ bottom: 0 }}
            exit={{ bottom: '-100%' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
