import Observe from './observe'
import {EventName} from 'config'

ClientEvent.subscribe(EventName.boardcastReceiveGiftPackageSuccess, (args) => {
	Observe.$emit(EventName.boardcastReceiveGiftPackageSuccess, args)
})

ClientEvent.subscribe(EventName.fontPurchased, (args) => {
	Observe.$emit(EventName.fontPurchased, args)
})

export {
	Observe,
	ClientEvent
}