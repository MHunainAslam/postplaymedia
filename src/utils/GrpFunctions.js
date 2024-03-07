import { message } from "antd";
import { GetToken } from "./Token";
import { deleteCookie } from "cookies-next";
import axios from "axios";
import { APP_URL } from "../../config";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
const token = GetToken('userdetail')
export const DltGrp = ({ grpid, router }) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${APP_URL}/api/groups/${grpid}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        message.success(response.data.message)
        router('/groups')
        document.querySelector('.close-grp-dlt-modalll').click()
      })
      .catch(error => {
        console.error(error);
        message.error(error?.response.data?.message)
        if (error?.response?.status === 401) {
          router('/')
          deleteCookie('logged');
          localStorage.removeItem('userdetail')
        }
      });
  });
};
export const joingrp = ({ e, getallgrp, type }) => {
  return new Promise((resolve, reject) => {
    axios.post(`${APP_URL}/api/groups/sendRequest`, { group_id: e, type: type }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => {
        // Handle successful response here
        message.success(response.data.message)
        getallgrp()
      })
      .catch(error => {
        // Handle error here
        // message.error(error.response?.data?.message)
        console.error(error);
      });
  });
}
const closemodal = () => {
  document.querySelectorAll('.close-fancybox-s')?.forEach(element => {
    element?.click();
  });
}
export const formatMentionsToLinks = (text, userid) => {
  // const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
  // let elements = [];
  // let lastIndex = 0;
  // text?.replace(mentionRegex, (match, name, id, index) => {
  //     if (index > lastIndex) {
  //         elements.push(text.slice(lastIndex, index)); // Yeh non-mention text ko add karega
  //     }
  //     elements.push(
  //         <Link key={index} onClick={closemodal} href={`${userid == id ? '/profile/activity' : `/people/${id}/activity`}  `} className='fw-bold clr-primary text-decoration-none' style={{ cursor: 'pointer', display: 'inline' }}>
  //             {name}
  //         </Link>
  //     );
  //     lastIndex = index + match.length;
  // });
  // if (lastIndex < text?.length) {
  //     elements.push(text.slice(lastIndex));
  // }
  // return elements.length > 0 ? elements : [text];
  // const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
  // const urlRegex = /https?:\/\/[^\s]+/g;
  // let elements = [];
  // let lastIndex = 0;

  // const addTextAsElements = (text, fromIndex, toIndex) => {
  //   const textPart = text.slice(fromIndex, toIndex);
  //   let lastUrlIndex = 0;
  //   textPart.replace(urlRegex, (match, index) => {
  //     if (index > lastUrlIndex) {
  //       elements.push(textPart.slice(lastUrlIndex, index));
  //     }
  //     elements.push(<a key={`url-${fromIndex + index}`} href={match} target="_blank" rel="noopener noreferrer" className='fw-bold clr-primary text-decoration-none' style={{ cursor: 'pointer', display: 'inline' }}>{match}</a>);
  //     lastUrlIndex = index + match.length;
  //   });
  //   if (lastUrlIndex < textPart.length) {
  //     elements.push(textPart.slice(lastUrlIndex));
  //   }
  // };

  // text?.replace(mentionRegex, (match, name, id, index) => {
  //   if (index > lastIndex) {
  //     addTextAsElements(text, lastIndex, index);
  //   }
  //   elements.push(
  //     <Link key={`mention-${index}`} onClick={closemodal} href={`${userid == id ? '/profile/activity' : `/people/${id}/activity`}`} className='fw-bold clr-primary text-decoration-none' style={{ cursor: 'pointer', display: 'inline' }}>
  //       {name}
  //     </Link>
  //   );
  //   lastIndex = index + match.length;
  // });
  // if (lastIndex < text?.length) {
  //   addTextAsElements(text, lastIndex, text.length);
  // }

  // return elements.length > 0 ? elements : [text];
  const mentionRegex = /@\[([^\]]+)\]\((\d+)\)/g;
  const urlRegex = /(\bhttps?:\/\/[^\s]+)|(\bwww\.[^\s]+)/ig;
  let elements = [];
  let lastIndex = 0;

  const addTextAsElements = (text, fromIndex, toIndex) => {
    // Directly add the text if no URLs are found
    if (!urlRegex.test(text.slice(fromIndex, toIndex))) {
      elements.push(text.slice(fromIndex, toIndex));
      return;
    }

    // Reset the lastIndex for URL parsing
    let lastUrlIndex = fromIndex;
    const textPart = text.slice(fromIndex, toIndex);

    textPart.replace(urlRegex, (match, index) => {
      const position = textPart.indexOf(match, lastUrlIndex - fromIndex) + fromIndex;
      // Text before URL
      if (position > lastUrlIndex) {
        elements.push(text.slice(lastUrlIndex, position));
      }
      // Correct the URL if it starts with "www."
      const correctedUrl = match.startsWith('www.') ? `http://${match}` : match;
      // URL itself
      elements.push(<a key={`url-${position}`} href={correctedUrl} target="_blank" rel="noopener noreferrer" className='fw-bold clr-primary text-decoration-none' style={{ cursor: 'pointer', display: 'inline' }}>{match}</a>);
      lastUrlIndex = position + match.length;
    });

    // Remaining text after the last URL
    if (lastUrlIndex < toIndex) {
      elements.push(text.slice(lastUrlIndex, toIndex));
    }
  };

  text?.replace(mentionRegex, (match, name, id, index) => {
    // Non-mention text before the current mention
    addTextAsElements(text, lastIndex, index);

    // Mention link
    elements.push(
      <Link key={`mention-${index}`} onClick={() => closemodal()} href={`${userid == id ? '/profile/activity' : `/people/${id}/activity`}`} className='fw-bold clr-primary text-decoration-none' style={{ cursor: 'pointer', display: 'inline' }}>
        {name}
      </Link>
    );
    lastIndex = index + match.length;
  });

  // Remaining text after the last mention (if any)
  if (lastIndex < text?.length) {
    addTextAsElements(text, lastIndex, text.length);
  }

  return elements.length > 0 ? elements : [text];
};
