import BaseOrderPrice from '../utils/BaseOrderPrice'
import { BaseAmountComponent } from '#typings'

export function TaxesAmount(props: BaseAmountComponent): JSX.Element {
  return <BaseOrderPrice base='amount' type='total_tax' {...props} />
}

export default TaxesAmount
