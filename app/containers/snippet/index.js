'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import HighlightJS from 'highlight.js'
import Shell from 'shell'
import './index.scss'
import '../../lib/vendor/styles/default.css'

class Snippet extends Component {

  createMarkup (content) {
    let html = '<pre><code>' + HighlightJS.highlightAuto(content).value + '</code></pre>'
    console.log(html)
    return { __html: html }
  }

  render () {
    let activeSnippet = this.props.gists[this.props.activeGist]
    if (!activeSnippet || !activeSnippet.details) {
      return (
        <div className='snippet-box'>
          <div className='snippet-code'></div>
        </div>
      )
    }

    let files = []
    let fileList = activeSnippet.details.files
    for (let key in fileList) {
      if (fileList.hasOwnProperty(key)) {
        let gistFile = fileList[key]
        files.push(
          <div key={ key }>
            <div>{ gistFile.filename }</div>
            <div>{ gistFile.language }</div>
            <div className='code-area' dangerouslySetInnerHTML={ this.createMarkup(gistFile.content) } />
          </div>
        )
      }
    }

    return (
      <div className='snippet-box'>
        <div className='snippet-code'>
          <p>{ activeSnippet.details.description }</p>
          <button type="button" onClick={ Shell.openExternal.bind(this, activeSnippet.details.html_url + '/revisions') } >
            View Revisions
          </button>
          { files }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    gists: state.gists,
    activeGist: state.activeGist
  }
}

export default connect(mapStateToProps)(Snippet)