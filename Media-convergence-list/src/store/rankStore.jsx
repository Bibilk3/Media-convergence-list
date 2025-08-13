// src/store/rankStore.js
import { createContext, useContext, useState } from'react';

// 创建上下文
const RankContext = createContext();

// 提供全局状态
export const RankProvider = ({ children }) => {
  // 存储三种榜单的数据，结构与两个页面的榜单对应
  const [sharedData, setSharedData] = useState({
    index: { list: [] },    // 指数榜数据
    popular: { list: [] },  // 爆款榜数据
    matrix: { list: [] }    // 矩阵榜数据
  });

  // 更新指定类型的榜单数据
  const updateSharedData = (type, data) => {
    setSharedData(prev => ({...prev, [type]: data }));
  };

  return (
    <RankContext.Provider value={{ sharedData, updateSharedData }}>
      {children}
    </RankContext.Provider>
  );
};

// 自定义Hook，方便组件使用全局状态
export const useRankStore = () => useContext(RankContext);