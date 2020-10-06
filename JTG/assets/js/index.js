var mockCommentData = [
    {
        id: 1,
        comment: 'First Level',
        like: 0,
        replies: [
            {
                id: 10,
                parentId: 1,
                comment: 'Second Level',
                like: 0,
                replies: [
                    {
                        id: 11,
                        parentId: 1,
                        subId: 10,
                        comment: 'Third Level',
                        like: 12,
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        comment: 'First Level',
        like: 0,
        replies: []
    }
];
var replyBox = 0;

function postNewComment(id, parentId, subId) {
    console.log(parentId)
    if (parentId && subId) {

    } else if (parentId) {
        const index = mockCommentData.findIndex(comment => comment.id === parentId);
        const data = mockCommentData[index].replies.push({
            id: mockCommentData.length+1,
            comment: document.getElementById(id).value,
            like: 0,
            replies: []
        });
        console.log(data)
        mockCommentData = [
                ...mockCommentData,
                ...data
        ]
        cancelNewComment(id);
    } else {
        mockCommentData.push({
            id: mockCommentData.length+1,
            comment: document.getElementById(id).value,
            like: 0,
            replies: []
        });
        cancelNewComment(id);
    }
    console.log(mockCommentData)
    document.getElementById('comments-listing').innerHTML = renderComments(mockCommentData);
}

function cancelNewComment(id) {
    document.getElementById(id).value = '';
}

function renderComments(commentsData) {
    var levelCount = 1;
    var commentsHtml = '';
    return renderCommentArea(commentsData, levelCount);
}

function renderCommentArea(commentsData, levelCount) {
    var commentsHtml = '';
    for (var i=0; i<commentsData.length; i++) {
        commentsHtml += '<div class=\"comment-area\">';
        commentsHtml += '<div class=\"comment-icon\">A</div>';
        commentsHtml += '<div class=\"comment-wrapper\">' + renderSingleComment(commentsData[i], levelCount) + '</div>';
        commentsHtml += '</div>';
    }
    return commentsHtml;
}

function createReplyButton(commentData, levelCount) {
    if (levelCount === 1) {
        return "<button onclick=\"postNewComment(" + commentData.id + ")\">Reply</button>";
    } else if (levelCount === 2) {
        return "<button onclick=\"postNewComment(" + commentData.id + "," + commentData.parentId +")\">Reply</button>";
    } else if (levelCount === 3) {
        return "<button onclick=\"postNewComment(" + commentData.id + "," + commentData.parentId +"," + commentData.subId +")\">Reply</button>";
    }
}

function createReplyComment(commentData, levelCount) {
    var commentsHtml = '';
    if (levelCount < 3 && commentData.id === replyBox) {
        commentsHtml += '<div class=\"reply-box\">';
        commentsHtml += '<input placeholder=\"Enter your reply here\" id=' + commentData.id + ' />';
        commentsHtml += createReplyButton(commentData, levelCount);
        commentsHtml += '<button>Cancel</button>';
        commentsHtml += '</div>';
    }
    return commentsHtml;
}

function renderSingleComment(commentData, levelCount) {
    var commentsHtml = '';
    commentsHtml += '<div class=\"comment-box\">';
    commentsHtml += '<div class=\"comment\">' + commentData.comment + '</div>';
    commentsHtml += '<div class=\"like-count\">' + commentData.like + '</div>';
    commentsHtml += '<div class=\"like-button\">Like</div>';
    commentsHtml += "<div class=\"reply-button\" onclick=\"addReplyBox(" + commentData.id + ")\">Reply</div>";
    commentsHtml += "</div>";
    commentsHtml += createReplyComment(commentData, levelCount);
    if (levelCount < 3 && commentData.replies.length > 0) {
        commentsHtml += '<div>' + renderCommentArea(commentData.replies, levelCount+1) + '</div>';
    }
    return commentsHtml;
}

function addReplyBox(id) {
    console.log(id);
    replyBox = id;
    document.getElementById('comments-listing').innerHTML = renderComments(mockCommentData);
}

function increaseLike(id) {
    console.log(id)
} 

document.getElementById('comments-listing').innerHTML = renderComments(mockCommentData);
