import { PropsWithChildren } from 'react'

const TileOverlayContainer = ({ children }: PropsWithChildren) => (
  <div className="relative isolate bg-[#EBD6BA]">
    <div
      style={{
        backgroundImage: 'url("./tile.png")',
        backgroundSize: '400px 400px',
        backgroundPositionY: '-20px',
      }}
      className="absolute inset-0 z-[-1] opacity-20"
    />
    {children}
  </div>
)

export default TileOverlayContainer
