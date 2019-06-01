//assert
describe('clipReducer/setClipStopTime', async assert => {
    const stopTime = 5;
    const clipState = {
      startTime: 2,
      stopTime: Infinity
    };
    assert({
      given: 'clip stop time',
      should: 'set clip stop time in state',
      //Переменная для тестирования
      actual: clipReducer(clipState, setClipStopTime(stopTime)),
      //То что должны получить по факту
      expected: { ...clipState, stopTime }
    });
  });


  /** Проверка соединения с базой */

  describe('checkDatabaseConnection', async assert => {
    
    assert({
      it('checkDatabaseConnection', function() {
        var res = parsedData;
        assert.equal(res.length, 20);
    });
  });

  /*
Test

  fetchResults();
  sortResults();
  
  
  */

