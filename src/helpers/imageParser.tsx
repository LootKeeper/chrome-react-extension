import { Image } from "../models/Image";

export const imageParser = async function (id: number, imgNode: Node): Promise<Image> {
    const src = imgNode.src;
    const name = _parseName(src)
    const size = await _parseSize(src);
    const humanizedSize = _humanizeSize(size);
    return new Image(id, name, humanizedSize, size, src);
}

function _parseName(src: string): string {
    return src.split('/').slice(-1).pop();
}

async function _parseSize(src: string): Promise<number> {
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

function _humanizeSize(size: number): string {
    let i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}