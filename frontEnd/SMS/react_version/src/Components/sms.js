import React from 'react'

function SendSMS() {

  async function QuickEasySMS(event) {
    event.preventDefault();
    const form = event.target;
    const to = form.querySelector('[name=to]').value;
    const msg = form.querySelector('[name=msg]').value;
    const result = await fetch("http://textit.biz/sendmsg/index.php?id=94763358718&pw=1995" + "&to=" + to + "&text=" + msg, {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({
        "message": msg,
        "toNumber": to,
      })
    }

    );

    const body = result.json();
    console.log(body);

    alert(body.StatusCode === 0
      ? 'Message sent!'
      : 'Something went wrong. Check dev console.');

  }

  return (
    <div>
      <h2>DBlock SMS</h2>
      <form onSubmit={QuickEasySMS}>
        <label>Phone Number</label>
        <input type="text" name="to" />
        <label>Message</label>
        <textarea name="msg"></textarea>
        <span></span>
        <button type="submit" >Send Message</button>
      </form>
    </div>

  )
}
export default SendSMS;