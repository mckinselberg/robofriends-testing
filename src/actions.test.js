import * as actions from './actions';
import * as types from './constants';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
const nock = require('nock');
const mockStore = configureMockStore([thunkMiddleware]);

const scope = nock('https://jsonplaceholder.typicode.com/users')
  .get('/')
  .reply(200, {
    
  });



describe('actions', () => {
  it('should create an action to search', () => {
    const text = 'Finish docs'
    const expectedAction = {
      type: types.CHANGE_SEARCHFIELD,
      payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction)
  })
})

describe("Fetch robots action PENDING", () => {
  it("should create a Pending action on request Robots", () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots())
    const action = store.getActions();
    expect(action[0]).toEqual({type: "REQUEST_ROBOTS_PENDING"});
  });
});

describe("Robots API", () => {
  const store = mockStore();
  const action = store.getActions();
  
  it('handles requesting robots API', () => {
    store.dispatch(actions.requestRobots());
    const expectedAction = {
      type: types.REQUEST_ROBOTS_PENDING
    }
    expect(action[0]).toEqual(expectedAction);
  });  

  it("should return success from API", () => {
    store.dispatch(actions.requestRobots());
    const expectedAction = {
      type: types.REQUEST_ROBOTS_SUCCESS
    }
    expect(action[0]).toEqual(expectedAction)
  });

  it("should return an API error", () => {
    store.dispatch(actions.requestRobots());
    const expectedAction = {
      type: types.REQUEST_ROBOTS_FAILED
    }
    expect(action[0]).toEqual(expectedAction)
  });
})