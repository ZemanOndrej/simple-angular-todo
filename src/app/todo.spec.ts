import {Todo} from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let todo = new Todo({text:"hello",completed:true});
    expect(todo.text).toEqual('hello');
    expect(todo.completed).toEqual(true);
  });
});
