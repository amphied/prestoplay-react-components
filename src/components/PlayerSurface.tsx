import React, {
  createRef,
  ForwardedRef, forwardRef,
  useEffect
} from "react";
import {BasePlayerComponentProps} from "../utils";

// @ts-ignore
import {clpp} from "@castlabs/prestoplay"

/**
 * The properties of the player surface. This is the element that receives
 * the prestoplay configuration.
 */
export interface PlayerProps extends BasePlayerComponentProps {
  /**
   * The PRESTOplay player configuration
   */
  config?: any,
}

/**
 * The Player Surface receives they player instance and a configuration
 * and renders the related video element. The component can be referenced, and
 * that ref can be use for instance to initiate full screen playback
 */
export const PlayerSurface = forwardRef<HTMLDivElement, PlayerProps>((props: PlayerProps, ref: ForwardedRef<HTMLDivElement>) => {
  const video = createRef<HTMLVideoElement>();

  useEffect(() => {
    if (video.current) {
      props.player.init(video.current)
    }
  }, [props.player, video.current])

  useEffect(() => {
    if (props.config) {
      props.player.load(props.config)
    } else {
      props.player.release()
    }
  }, [props.config, props.player])

  const mouseMove = () => {
    if (!props.player.controlsVisible) {
      props.player.surfaceInteraction()
    }
  }
  const onKeyDown = async (e:React.KeyboardEvent) => {
    if(e.defaultPrevented) return
    let presto = await props.player.presto();
    switch (e.code) {
      case "ArrowRight":
        presto.seek(presto.getPosition() + 10)
        break
      case "ArrowLeft":
        presto.seek(presto.getPosition() + (-10))
        break
      case "Space":
        presto.isPaused() ? presto.play() : presto.pause()
        e.preventDefault()
        break
    }
  }

  return (
    <div ref={ref}
         className={`pp-ui pp-ui-surface ${props.className || ''}`}
         style={props.style}
         onMouseMove={mouseMove}
         onKeyDown={onKeyDown}
         tabIndex={0}
    >
      <video className={"pp-ui pp-ui-video"} ref={video} tabIndex={-1}></video>
      <div className={"pp-ui pp-ui-overlay"}>
        {props.children}
      </div>
    </div>
  )
})

export default PlayerSurface
