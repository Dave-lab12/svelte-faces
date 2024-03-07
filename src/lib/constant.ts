
export const AvatarStyleCount = {
    face: 15,
    nose: 13,
    mouth: 19,
    eyes: 13,
    eyebrows: 15,
    glasses: 14,
    hair: 58,
    accessories: 14,
    details: 13,
    beard: 16,
};


export const SVGFilter = `<defs>
    <filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
      <feMorphology operator="dilate" radius="20 20" in="SourceAlpha" result="morphology"/>
      <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
      <feComposite in="flood" in2="morphology" operator="in" result="composite"/>
      <feMerge result="merge">
            <feMergeNode in="composite" result="mergeNode"/>
        <feMergeNode in="SourceGraphic" result="mergeNode1"/>
        </feMerge>
    </filter>
  </defs>`;

