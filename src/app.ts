import mount from './mount'
import { state, spawnMany } from './GCounterMain'
import { Signal, map } from 'acto'
import { VDom } from 'sprezzatura'
import { AppView } from './view'

const view: Signal<VDom> = map(AppView, state)

mount(document.getElementById('app'), view)

spawnMany(3)
