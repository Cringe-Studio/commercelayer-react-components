import { ConditionalElement } from '#typings'
import GenericFieldComponent, {
  TGenericChildrenProps,
  TResourceKey,
  TResources
} from '#components/utils/GenericFieldComponent'
import ParcelLineItemChildrenContext from '#context/ParcelLineItemChildrenContext'

type ParcelLineItemFieldChildrenProps = TGenericChildrenProps<
  TResources['ParcelLineItem']
>

type TCondition = ConditionalElement<
  Exclude<TResources['ParcelLineItem'], 'resource'>
>

type Props = {
  children?: (props: ParcelLineItemFieldChildrenProps) => JSX.Element
} & TCondition
/**
 * @param props {@link Props}
 * @returns
 */
export function ParcelLineItemField<P extends Props>(props: P): JSX.Element {
  const { attribute, tagElement, children, ...p } = props
  return (
    <GenericFieldComponent<TResourceKey['ParcelLineItem']>
      resource='parcelLineItem'
      attribute={attribute}
      tagElement={tagElement}
      context={ParcelLineItemChildrenContext}
      {...p}
    >
      {children}
    </GenericFieldComponent>
  )
}

export default ParcelLineItemField
