import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  // 10진수로 parsing
  // parseInt('100', 10) ==> 숫자 100 / parseInt('100', 2) ==> 숫자 4
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

// 댓글이 db에 저장되는데에 시간이 걸릴 뿐더러 한번 새로고침을 해줘야 댓글이 나타나므로 fake로 내가 쓴 댓글이 달자마자 추가된것처럼 보여지게 하는 역할
const addComment = (comment, commentID) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerHTML = comment;
  delBtn.id = String(commentID);
  delBtn.innerText = "❌";
  //   delBtn.addEventListener("click", handleClick);
  span.appendChild(delBtn);
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
  window.location.reload();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
