import React, { Fragment } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Header } from './modules/header';
import styled from 'styled-components';
import { MicrofrontendProps, Microfrontend } from './components/microfrontend';

const StyledHeader = styled(Header)`
    background-color: #24292e;
    height: 48px;
    line-height: 48px;
`

const Content = styled.div`
    height: calc(100% - 48px);

    > div {
        height: 100%;
    }
`

export const App: React.FC = () => {
    return (
        <div className="App">
            <StyledHeader className="header"/>
            <Content>
                <BrowserRouter>
                    <Fragment>
                        <Switch>
                            <Route exact path="/" component={GalleryApp} />
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            </Content>
        </div>
    );
}


const GalleryApp: React.FC<MicrofrontendProps> = React.memo<React.FC<MicrofrontendProps>>((props: MicrofrontendProps) => 
    <Microfrontend host={process.env['REACT_APP_GALLERY_APP_HOST']!} history={props.history} name="GalleryApp" />
)