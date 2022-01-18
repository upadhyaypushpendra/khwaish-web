import { getDefaultKeyBinding, ContentBlock, KeyBindingUtil } from 'draft-js';
const { hasCommandModifier } = KeyBindingUtil;

export function keyBinding(e: any): string | null {
    if (e.keyCode === 13 && hasCommandModifier(e)) {
        return 'send-message';
    }
    return getDefaultKeyBinding(e);
}

export function blockStyle(contentBlock: ContentBlock) {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
        return 'Blockquote';
    }
    return "";
}
