import React  from 'react';
import {
  IntlProvider as ReactIntlProvider,
} from 'react-intl';

import useLocationSearch from 'hooks/useLocationSearch';
import getMessages from 'intl';

const IntlProvider = ({
  children,
}) => {
  const {
    lang,
  } = useLocationSearch();

  return (
    <ReactIntlProvider locale={lang} messages={getMessages(lang)}>
      {children}
    </ReactIntlProvider>
  )
};

export default IntlProvider;
