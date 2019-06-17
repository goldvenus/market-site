import React from "react";
import {Helmet} from "react-helmet";
import {metas} from "./dummydata";

const CustomMetaTag = ({path, query}) => {
  return metas[path] ? (
    <Helmet>
      <title>{metas[path].title || 'Creative Market'}</title>
      {metas[path].description && <meta name="description" content={metas[path].description} />}
      {metas[path].keywords && <meta name="keywords" content={metas[path].keywords} />}
      <meta property="og:title" content={metas[path]['og:title']} />
      <meta property="og:description" content={metas[path]['og:description']} />
      <meta property="og:type" content={metas[path]['og:type']} />
      <meta property="og:image" content={metas[path]['og:image']} />
      <meta property="og:url" content={`https://creative.market${path}/${query}`} />
      {/*<link rel="canonical" href="https://creative.market/rent-gear?type=all" />*/}
      {/*<link rel="canonical" href="https://creative.market/gear/detail" />*/}
    </Helmet>
  ) : null
};

export default CustomMetaTag;