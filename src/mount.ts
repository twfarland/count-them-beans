import { Signal, fold, listen } from 'acto'
import { updateDom, vDomToDom, VDom } from 'sprezzatura'

interface UIState {
    domNode: HTMLElement;
    vDom: VDom;
}

export default function mount (domParent: HTMLElement, vDoms: Signal<VDom>) {

    const div: HTMLElement = document.createElement('div')
    const intialUI: UIState = { domNode: div, vDom: ['div', {}, []] }

    domParent.appendChild(div)
    
    return fold<VDom, UIState>((nextVDom, { domNode, vDom }) => {
            updateDom(vDom, nextVDom, domNode, domParent)
            return { domNode, vDom: nextVDom }    
        }, 
        intialUI, 
        vDoms
    )
}
