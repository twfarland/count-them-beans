import { VDom } from 'sprezzatura'
import { GCounterCluster, GCounterWorker, increment } from './GCounterMain'
import { mapObject, set } from './utils'
import './view.css'

const _ = null
const Div = 'div'
const Button = 'button'
const H1 = 'h1'

function CounterView ({ key, total, emitting }: GCounterWorker): VDom {
    return [Div, { 'class': 'counter' }, [
                [Button, { 
                    on: { click() { increment(key) } } 
                }, ['Increment']],
                [Div, _, ['Total: ' + total]],
                emitting && 
                [Div, { 'class': 'emitting' }, [total]]
            ]]
}

export function AppView (cluster: GCounterCluster): VDom {
    return [Div, { 'class': 'app' }, [
                [H1, _, ['Count them beans!']],
                [Div, _, mapObject(cluster, ({ total, emitting }, key) => 
                    [CounterView, <GCounterWorker>{ key, total, emitting }]
                )]
            ]]
}
