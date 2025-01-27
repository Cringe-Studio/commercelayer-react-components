import { createContext } from 'react'
import {
  AddressState,
  SetAddress,
  setAddress,
  AddressResource
} from '#reducers/AddressReducer'
import { BaseError } from '#typings/errors'

type DefaultContext = {
  saveAddresses: () => void
  setCloneAddress: (id: string, resource: AddressResource) => void
  setAddress: SetAddress
  setAddressErrors: (errors: BaseError[], resource: AddressResource) => void
} & AddressState

export const defaultAddressContext = {
  saveAddresses: (): void => {},
  setCloneAddress: (): void => {},
  setAddress,
  setAddressErrors: () => {}
}

const AddressesContext = createContext<DefaultContext>(defaultAddressContext)

export default AddressesContext
