'use strict';
const issues_1 = require('./issues');
class Changelog {
    constructor(pr) {
        this.number = pr.number;
        this.title = pr.title;
        this.issueUrls = issues_1.getIssuesFromBody(pr.body);
        this.user = pr.user;
    }
    show() {
        var urls = this.issueUrls.join(',');
        return `[${urls}] ${this.title} #${this.number} (@${this.user.login})`;
    }
    toMarkdown() {
        let urlMarkdown = this.issueUrls.map((issue) => {
            return `[${issue}](${issues_1.formatJiraIssue(issue)})`;
        }).join(',');
        return `[${urlMarkdown}] ${this.title} #${this.number} (@${this.user.login})`;
    }
    isDeployChangelog() {
        return /^B\d{6}/.test(this.title);
    }
    isMasterToDevelop() {
        return /master -> develop/i.test(this.title);
    }
}
exports.Changelog = Changelog;
function newChangelog(pr) {
    return new Changelog(pr);
}
exports.newChangelog = newChangelog;
function isNotDeployChangelog(c) {
    return !c.isDeployChangelog();
}
exports.isNotDeployChangelog = isNotDeployChangelog;
function isNotMasterMergeIntoDevelop(c) {
    return !c.isMasterToDevelop();
}
exports.isNotMasterMergeIntoDevelop = isNotMasterMergeIntoDevelop;
function showChangelog(c) {
    return c.show();
}
exports.showChangelog = showChangelog;
function markdownChangelog(c) {
    return c.toMarkdown();
}