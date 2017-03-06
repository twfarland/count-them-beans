import { VDom } from 'sprezzatura'
import { query } from './GCounter'
import { GCounterCluster, GCounterWorker, increment, spawn } from './GCounterMain'
import { mapObject, set } from './utils'
import './view.css'

const _ = null
const Div = 'div'
const Button = 'button'
const H1 = 'h1'
const A = 'a'
const P = 'p'

function CounterView ({ key, total, emitting }): VDom {
    return [Div, { 'class': 'counter' + (emitting ? ' emitting' : '') }, [
                [Div, { 'class': 'total' }, [total]],
                [Button, { 
                    on: { click() { increment(key) } } 
                }, ['&plus;']]
            ]]
}

export function AppView (cluster: GCounterCluster): VDom {
    return [Div, { 'class': 'app' }, [
                [H1, _, ['count them beans']],
                [P, _, [
                    [A, { href: 'https://github.com/twfarland/count-them-beans' }, ['source']]
                ]],
                [Button, { on: { click: spawn } }, ['spawn counter']],
                [Div, _, mapObject(cluster, (worker: GCounterWorker, key) => 
                    [CounterView, { 
                        key: worker.gc.key,
                        total: query(worker.gc), 
                        emitting: worker.emitting 
                    }]
                )]
            ]]
}
