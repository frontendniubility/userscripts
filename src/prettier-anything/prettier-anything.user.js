// ==UserScript==
// @name         Prettier Anything
// @namespace    prettier-anything
// @author       fuzetsu
// @version      0.1.4
// @description  Apply prettier formatting to any text input
// @match        *://*/*
// @inject-into  content
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @require      https://cdn.jsdelivr.net/gh/kufii/My-UserScripts@00302ac8bd875599ed97df07b379b58f9b4932bd/libs/gm_config.js
// ==/UserScript==


'use strict'

const deps = [
  'https://unpkg.com/prettier@2/standalone.js',
  'https://unpkg.com/prettier@2/parser-babel.js'
]

const loadDep = url =>
  new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url,
      onload: res => resolve(res.responseText),
      onerror: () => reject(new Error(`Failed to load ${url}`))
    })
  })

const Config = GM_config([
  {
    key: 'prettierrc',
    label: 'Prettier Config',
    default: '{}',
    type: 'text',
    multiline: true,
    resizable: true
  },
  {
    key: 'binding',
    label: 'Key Binding',
    type: 'keybinding',
    default: { altKey: true, shiftKey: true, key: 'I' },
    requireModifier: true,
    requireKey: true
  },
  {
    key: 'copyBinding',
    label: 'Copy Key Binding',
    type: 'keybinding',
    default: { ctrlKey: true, altKey: true, shiftKey: true, key: 'I' },
    requireModifier: true,
    requireKey: true
  }
])
GM_registerMenuCommand('Prettier Anywhere Settings', () => {
  if (window.top === window.self) Config.setup()
})
let config = Config.load()
Config.onsave = cfg => (config = cfg)

const p = (...args) => (console.log(...args), args[0])

let loaded = false
const load = () => {
  if (loaded) return
  loaded = true
  return Promise.all(deps.map(loadDep)).then(scripts => scripts.map(eval)) // eslint-disable-line no-eval
}

const getSelection = () => {
  const elem = document.activeElement
  if (['INPUT', 'TEXTAREA'].includes(elem.nodeName)) {
    return elem.value.slice(elem.selectionStart, elem.selectionEnd)
  } else if (elem.contentEditable) {
    if (!document.getSelection().toString()) return
    document.execCommand('copy')
    return navigator.clipboard.readText()
  } else return document.getSelection().toString()
}

const insertText = text => {
  const elem = document.activeElement
  if (typeof InstallTrigger !== 'undefined' && ['INPUT', 'TEXTAREA'].includes(elem.nodeName)) {
    elem.value =
      elem.value.slice(0, elem.selectionStart) + text + elem.value.slice(elem.selectionEnd)
  } else {
    document.execCommand('insertText', false, text)
  }
}

const prettify = async clip => {
  const code = getSelection()
  p('key combo HIT, selection = ', code, '; clip = ', clip)
  if (!code) return p('no selection, so nothing to do')
  p('--- PRETTIER START ---')

  p('Loading Prettier')
  const loadStart = Date.now()
  await load()
  p('Loaded, delta = ', Date.now() - loadStart)

  const conf = {
    ...JSON.parse(config.prettierrc || '{}'),
    parser: 'babel',
    plugins: prettierPlugins
  }
  p('formatting using conf:', conf)

  const formatted = prettier.format(code, conf)
  if (clip) GM_setClipboard(formatted)
  else insertText(formatted)

  document.getSelection().empty()

  p('BEFORE:\n', code)
  p('AFTER:\n', formatted)
  p('--- PRETTIER END ---')
}

const keyBindingsMatch = (a, b) =>
  !a.ctrlKey === !b.ctrlKey &&
  !a.altKey === !b.altKey &&
  !a.shiftKey === !b.shiftKey &&
  !a.metaKey === !b.metaKey &&
  a.key.toUpperCase() === b.key.toUpperCase()

window.addEventListener('keydown', e => {
  if (keyBindingsMatch(e, config.binding)) {
    e.preventDefault()
    prettify()
  } else if (keyBindingsMatch(e, config.copyBinding)) {
    e.preventDefault()
    prettify(true)
  }
})
