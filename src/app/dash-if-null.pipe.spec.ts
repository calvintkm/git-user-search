import { DashIfNullPipe } from './dash-if-null.pipe';

describe('DashIfNullPipe', () => {
  it('create an instance', () => {
    const pipe = new DashIfNullPipe();
    expect(pipe).toBeTruthy();
  });
});
