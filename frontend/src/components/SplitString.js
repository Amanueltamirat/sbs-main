import React from 'react'

function SplitString(string) {
    const characters = [];
    const regx = /[\s\S]/gu;
    let match;

while((match =regx.exec(string)) !== null){
    characters.push(match[0])
}

  return (
    characters
  )
}

export default SplitString