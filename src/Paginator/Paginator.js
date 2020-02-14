import React, { Component } from 'react'

import ListItemIndex from '../MessageList/ListItemIndex';

export default class Paginator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0
        }

        this.pageForward = this.pageForward.bind(this);
        this.pageBack = this.pageBack.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.numPages = this.numPages.bind(this);
    }

    numPages() {
        return Math.ceil(this.props.messages.length/5);
    }

    pageForward() {
        if (this.state.page + 1 < this.numPages()) {
            this.setState({ page: this.state.page + 1 })
        }
    }

    pageBack() {
        if (this.state.page > 0) {
            this.setState({ page: this.state.page - 1 })
        }
    }

    deleteMessage(idxOnPage) {
        let realIdx = idxOnPage + (this.state.page * 5);
        this.props.deleteMessage(realIdx);
    }

    render() {

        let {pageBack, pageForward, numPages} = this;
        let {messages, listProps} = this.props;
        let {page} = this.state;

        let {toggleSortByDate, sort} = listProps;

        return (
            <div className="page-viewer">
                <ListItemIndex
                    messages={messages.slice(page * 5, (page * 5 + 5))}
                    toggleSortByDate={toggleSortByDate}
                    sort={sort}
                    deleteMessage={this.deleteMessage}
                />
                <div className="paginator">
                    <button className="page-button" onClick={pageBack}>❮</button>
                    <span>Page {page + 1} of {numPages()}</span>
                    <button className="page-button" onClick={pageForward}>❯</button>
                </div>  
            </div>
        )
    }
}