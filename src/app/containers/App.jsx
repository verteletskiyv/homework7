import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route,
  useParams,
} from 'react-router-dom';
import IntlProvider from 'components/IntlProvider';
import Header from 'components/Header';
import PageInitial from 'pageProviders/Initial';
import PageLogin from 'pageProviders/Login';
import PageBooks from 'pageProviders/Books';
import PageBook from 'pageProviders/Book';
import * as PAGES from 'constants/pages';
import {fetchUser} from '../actions/user';
import PageContainer from "../../components/PageContainer";
import Book from "../../pages/Book";


const App = () => {
  const [state, setState] = useState({
    componentDidMount: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    setState(prevState => ({
      ...prevState,
      componentDidMount: true,
    }));
  }, []);

  const SpecificBook = () => {
    let { id } = useParams();
    return (
        <PageContainer>
          <Book id={id} formTitle="Update Book" />
        </PageContainer>
    );
  }

  return (
    <BrowserRouter>
      <IntlProvider>
        <Header />
        {state.componentDidMount && (
            <Switch>
              <Route path={`/${PAGES.LOGIN}`}>
                <PageLogin />
              </Route>
              <Route path={`/${PAGES.INITIAL}`}>
                <PageInitial />
              </Route>
              <Route path={`/${PAGES.BOOKS}`}>
                <PageBooks />
              </Route>
              <Route path={`/${PAGES.BOOK}/:id`}>
                <SpecificBook/>
              </Route>
              <Route path={`/${PAGES.BOOK}`}>
                <PageBook/>
              </Route>
              <Redirect from="*" to={`/${PAGES.INITIAL}`} />
            </Switch>
        )}
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
