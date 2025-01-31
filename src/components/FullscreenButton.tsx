import React, {useRef, useState} from "react";
import {Player, usePrestoEvent} from "../Player";
import {BasePlayerComponentButtonProps} from "../utils";
import BaseButton from "./BaseButton";

// @ts-ignore
import {clpp} from "@castlabs/prestoplay"

export interface FullscreenButtonProps extends BasePlayerComponentButtonProps{
  fullscreenContainer: React.MutableRefObject<HTMLElement | null>;
}

export const FullscreenButton = (props: FullscreenButtonProps) => {
  let [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);

  function toggle() {
    if(props.fullscreenContainer.current) {
      if(!fullscreen) {
        props.fullscreenContainer.current.requestFullscreen()
        setFullscreen(true)
      } else {
        document.exitFullscreen()
        setFullscreen(false)
      }
    }
  }

  return (
    <BaseButton onClick={toggle} disableIcon={props.disableIcon}
                className={`pp-ui-fullscreen pp-ui-fullscreen-${fullscreen ? "enabled" : "disabled"} ${props.className || ''}`}>
      {props.children}
    </BaseButton>
  );
}

export default FullscreenButton
