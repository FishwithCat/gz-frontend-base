import React, { useEffect, useState } from 'react';
import { Loading } from 'element-react';


export interface MicrofrontendProps {
    name: string,
    host: string,
    history: History
}

class Manifest {
    manifest: string

    constructor(manifestJson: any) {
        this.manifest = manifestJson['main.js'] || manifestJson['files']['main.js']
    }
}

export const Microfrontend: React.FC<MicrofrontendProps> = (props: MicrofrontendProps) => {
    const [ loading, setLoading ] = useState<boolean>(true)

    useEffect(() => {
        const scriptId = `micro-frontend-script-${props.name}`

        const insertComponentAndRender = (scriptId: string, manifest: Manifest) => {
            const script: HTMLScriptElement = document.createElement('script')
            script.id = scriptId
            script.src = `${props.host}${manifest.manifest}`
            script.onload = () => renderMicroFrontend(props.name, props.history)
            document.head.appendChild(script);
        }

        if (document.getElementById(scriptId)) {
            renderMicroFrontend(props.name, props.history)
            setLoading(false)
        } else {
            fetch(`${props.host}/asset-manifest.json`).then(res => res.json())
            .then(manifest => insertComponentAndRender(scriptId, new Manifest(manifest)))
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
        }
        return () => unmountComponent(props.name)
    }, [props.name, props.history, props.host])

    return (
        <Loading loading={loading}>
            <main className="micro-frontend-component" id={`${props.name}-container`}></main>
        </Loading>
    )
}
const renderMicroFrontend = (name: string, history: History) => {
    try {
        (window as any)[`render${name}`](`${name}-container`, history);
    } catch(e) {
        console.error(e)
    }
}

const unmountComponent = (componentName: string) => {
    try {
        (window as any)[`unmount${componentName}`](`${componentName}-container`)
    } catch(e) {
        console.error(e)
    }
}

