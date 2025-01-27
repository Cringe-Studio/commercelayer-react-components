import { useContext, ReactNode, useState, useEffect } from 'react'
import ShipmentContext from '#context/ShipmentContext'
import ShipmentChildrenContext from '#context/ShipmentChildrenContext'
import { LoaderType } from '#typings'
import getLoaderComponent from '#utils/getLoaderComponent'
import { ShipmentLineItem } from '#reducers/ShipmentReducer'

interface ShipmentProps {
  children: ReactNode
  loader?: LoaderType
  autoSelectSingleShippingMethod?: boolean | (() => void)
}

export function Shipment({
  children,
  loader = 'Loading...',
  autoSelectSingleShippingMethod = false
}: ShipmentProps): JSX.Element {
  const [loading, setLoading] = useState(true)
  const { shipments, deliveryLeadTimes, setShippingMethod } =
    useContext(ShipmentContext)
  useEffect(() => {
    if (shipments) {
      if (autoSelectSingleShippingMethod) {
        const autoSelect = async (): Promise<void> => {
          shipments.forEach(async (shipment): Promise<void> => {
            const isSingle = shipment?.available_shipping_methods?.length === 1
            if (!shipment?.shipping_method && isSingle) {
              const [shippingMethod] =
                shipment?.available_shipping_methods || []
              if (shippingMethod) {
                await setShippingMethod(shipment.id, shippingMethod.id)
              }
              if (typeof autoSelectSingleShippingMethod === 'function') {
                autoSelectSingleShippingMethod()
              }
            } else {
              setTimeout(() => {
                setLoading(false)
              }, 200)
            }
          })
        }
        void autoSelect()
      } else {
        setLoading(false)
      }
    }
  }, [shipments])
  const components = shipments?.map((shipment, k) => {
    const shipmentLineItems = shipment.shipment_line_items as ShipmentLineItem[]
    const lineItems = shipmentLineItems?.map((shipmentLineItem) => {
      const l = shipmentLineItem.line_item
      if (l) l.quantity = shipmentLineItem.quantity
      return l
    })
    const shippingMethods = shipment.available_shipping_methods
    const currentShippingMethodId =
      autoSelectSingleShippingMethod &&
      shippingMethods &&
      shippingMethods.length === 1
        ? shippingMethods[0]?.id
        : shipment.shipping_method?.id
    const stockTransfers = shipment.stock_transfers
    const parcels = shipment.parcels
    const times = deliveryLeadTimes?.filter(
      (time) => time.stock_location?.id === shipment.stock_location?.id
    )
    const shipmentProps = {
      parcels,
      lineItems,
      shippingMethods,
      currentShippingMethodId,
      stockTransfers,
      deliveryLeadTimes: times,
      shipment,
      keyNumber: k + 1
    }
    return (
      <ShipmentChildrenContext.Provider key={k} value={shipmentProps}>
        {children}
      </ShipmentChildrenContext.Provider>
    )
  })
  return !loading ? <>{components}</> : getLoaderComponent(loader)
}

export default Shipment
