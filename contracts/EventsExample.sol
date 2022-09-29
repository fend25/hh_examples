pragma solidity ^0.8.0;


interface EventsExampleEvents {
  event Num (
    uint256 indexed num
  );

  event Addr (
    address indexed addr
  );

  event UI (
    uint256 indexed ui
  );
}



contract EventsExample is EventsExampleEvents {
  function f1() public {
    emit Num(1);
  }

  function f2(address addr) public {
    emit Num(2);
    emit Addr(addr);
  }

  function f3(uint256 ui) public {
    emit Num(3);
    emit UI(ui);
  }

  function f4(address addr, uint256 ui) public {
    emit Num(4);
    emit Addr(addr);
    emit UI(ui);
  }

  function f5(uint256 ui, address addr) public {
    emit Num(5);
    emit UI(ui);
    emit Addr(addr);
  }

  function f6(uint256 num, address addr, uint256 ui) public {
    emit Num(6);
    emit Num(num);
    emit Addr(addr);
    emit UI(ui);
  }

  function f7(uint256 num, uint256 ui, address addr) public {
    emit Num(7);
    emit Num(num);
    emit UI(ui);
    emit Addr(addr);
  }
}
