/*global chrome*/

import * as React from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { toggleVisibility } from '.';
import './App.css';
import { List } from './components/list/list';
import { Image } from './models/Image';
import { RowFilter } from './components/rowFilter/rowFilter';
import { number } from 'prop-types';
import { Menu } from './components/menu/menu';

export interface AppProps {
    parentElement: HTMLDivElement
}

export interface AppState {
    images: Image[],
    rows: number
}

class App extends React.Component<AppProps, AppState> {

    _mainNodeRef: React.RefObject<HTMLDivElement>

    constructor(props: AppProps) {
        super(props);
        this.state = {
            images: [],
            rows: 10
        };
        this._mainNodeRef = React.createRef();
    }

    componentDidMount() {
        this._imgSearch();
    }

    async _imgSearch() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, { acceptNode: (node: Node) => this._nodeFilter(node) });
        let imgParseTasks: Promise<Image>[] = [];
        while (walker.nextNode()) {
            imgParseTasks.push(this._parse(imgParseTasks.length, walker.currentNode));
        }

        Promise.all(imgParseTasks).then(images => {
            this.setState({
                images: images
            })
        })
    }

    async _parse(id: number, imgNode: Node): Promise<Image> {
        const src = imgNode.src;
        const name = this._parseName(src)
        const size = await this._parseSize(src);
        const humanizedSize = this._humanizeSize(size);
        return new Image(id, name, humanizedSize, size, src);
    }

    _parseName(src: string): string {
        return src.split('/').slice(-1).pop();
    }

    async _parseSize(src: string): Promise<number> {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.responseType = 'blob';
            xhr.onload = () => {
                let blob: Blob = xhr.response
                resolve(blob.size);
            }
            xhr.send();
        });
    }

    _humanizeSize(size: number): string {
        let i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
    }

    _nodeFilter(node: Node): number {
        // skip current node
        if (node === this._mainNodeRef.current) {
            return NodeFilter.FILTER_REJECT;
        }
        if (node.nodeName === 'IMG') {
            return NodeFilter.FILTER_ACCEPT;
        }

        return NodeFilter.FILTER_SKIP;
    }

    _handleDownloadAll() {
        this.state.images.forEach(image => {
            const request = { type: 'downloadImage', image: image };
            chrome.runtime.sendMessage(request);
        });
    }

    _closeHandler() {
        toggleVisibility(this.props.parentElement);
    }

    _handleRowChanges(value: number) {
        this.setState({ rows: value });
    }

    render() {
        return (
            <Frame style={{ border: 'none', width: '100%', height: '100%', display: 'unset' }} head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("bundle.css")} ></link>]}>
                <div id="main" ref={this._mainNodeRef} className="app">
                    <div className="content">
                        <div className="content-body container">
                            <div className="menu-container">
                                <Menu 
                                    handleDownloadAll={() => this._handleDownloadAll()} 
                                    handleRowChanges={(e:number) => this._handleRowChanges(e)} 
                                    rows={this.state.rows}/>
                            </div>
                            <div className="list-container">
                                <List images={this.state.images.slice(0, this.state.rows)} />
                            </div>
                        </div>
                        <div className="header">
                            <button className="header__close-btn" onClick={() => this._closeHandler()}>X</button>
                        </div>
                    </div>
                </div>
            </Frame>
        )
    };
}

export default App;