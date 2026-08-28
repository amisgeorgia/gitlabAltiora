declare module "scrollreveal" {
  interface ScrollRevealObjectOptions {
    origin?: string;
    distance?: string;
    duration?: number;
    delay?: number;
    rotate?: { x?: number; y?: number; z?: number };
    opacity?: number;
    scale?: number;
    easing?: string;
    container?: HTMLElement | string;
    mobile?: boolean;
    reset?: boolean;
    useDelay?: string;
    viewFactor?: number;
    viewOffset?: { top?: number; right?: number; bottom?: number; left?: number };
    beforeReveal?: (domEl: HTMLElement) => void;
    beforeReset?: (domEl: HTMLElement) => void;
    afterReveal?: (domEl: HTMLElement) => void;
    afterReset?: (domEl: HTMLElement) => void;
    interval?: number;
    cleanup?: boolean;
  }

  interface ScrollRevealObject {
    reveal(
      target: string | HTMLElement | NodeListOf<HTMLElement> | HTMLElement[],
      options?: ScrollRevealObjectOptions
    ): ScrollRevealObject;
    sync(): void;
    destroy(): void;
    clean(target: string | HTMLElement | NodeListOf<HTMLElement> | HTMLElement[]): void;
  }

  function ScrollReveal(options?: ScrollRevealObjectOptions): ScrollRevealObject;
  export default ScrollReveal;
}
