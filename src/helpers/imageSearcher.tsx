import { Image } from "../models/Image";
import { imageParser } from "./imageParser";

export async function imageSearch(excludeNode: Node[]): Promise<Image[]> {
    return new Promise(resolve => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, { acceptNode: (node: Node) => _nodeFilter(node, excludeNode) });
        let imgParseTasks: Promise<Image>[] = [];
        while (walker.nextNode()) {
            imgParseTasks.push(_parseImg(imgParseTasks.length, walker.currentNode));
        }

        Promise.all(imgParseTasks).then(images => {
            resolve(images);
        })
    })
}

function _nodeFilter(node: Node, excludeNode: Node[]): number {
    if (excludeNode.includes(node)) {
        return NodeFilter.FILTER_REJECT;
    }
    if (node.nodeName === 'IMG') {
        return NodeFilter.FILTER_ACCEPT;
    }

    return NodeFilter.FILTER_SKIP;
}

async function _parseImg(id: number, imgNode: Node): Promise<Image> {
    return await imageParser(id, imgNode);
}