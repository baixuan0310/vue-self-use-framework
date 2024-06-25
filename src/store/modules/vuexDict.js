let state = {
  // 校区列表
  campusList: [],
  // 学校列表
  schoolList: [],
  // 班级列表
  classList: [],
  // 学校列表 -- 树状数据
  schoolTreeList: [],
  // 年级列表
  // gradeList: [
  //   {
  //     id: 0,
  //     year_cn: ''
  //   }
  // ],
  gradeList: [],
  // 专业库 -- 总校的
  magorList: [],
  // 学校年级对应的专业
  specialityList: [],
  // 学校对应的专业学制
  eduSystemList: [],
  // 宿舍楼的类型
  roomTypeList: [],
  // 宿舍楼列表(和校区学校数据联动)
  buildingList: [],
  // 宿舍列表
  roomList: [],
  // 床位列表
  bedList: [],
  // 学校下的子管理员列表, 和学校联动(查询班主任)
  agentList: [],
  // 启用禁用
  enabled: [
    {
      id: '0',
      name: '全部'
    }, {
      id: '1',
      name: '启用'
    }, {
      id: '2',
      name: '禁用'
    },
  ],
  // 是否
  yesOrNo: [
    {
      id: '0',
      name: '全部'
    }, {
      id: '1',
      name: '是'
    }, {
      id: '2',
      name: '否'
    },
  ],
  // 性别
  sexList: [
    {
      id: '0',
      name: '全部'
    },
    {
      id: '1',
      name: '男'
    }, {
      id: '2',
      name: '女'
    },
  ],
  // 学生类型1
  exam_type_list: [
    {
      id: '0',
      name: '全部'
    }, {
      id: '1',
      name: '应届'
    }, {
      id: '2',
      name: '往届'
    },
  ],
  // 招生方式
  exam_category_list: [
    {
      id: '0',
      name: '全部'
    }, {
      id: '1',
      name: '统招'
    }, {
      id: '2',
      name: '非统招'
    },
  ],
  // 报名类型
  input_type_list: [
    {
      id: '0',
      name: '全部'
    }, {
      id: '1',
      name: '自主报名'
    }, {
      id: '2',
      name: '招生老师代录'
    },
  ],
  // bed_rule 床类型规则 	1不区分上下铺，2初始编号为上铺，3初始编号为下铺
  bed_rule: [
    {
      id: '1',
      name: '不区分上下铺'
    }, {
      id: '2',
      name: '上铺'
    }, {
      id: '3',
      name: '下铺'
    },
  ],
  // floor_type 床类型规则 	1不区分上下铺，2初始编号为上铺，3初始编号为下铺
  floor_type: [
    {
      id: '1',
      name: '男生宿舍'
    }, {
      id: '2',
      name: '女生宿舍'
    }, {
      id: '3',
      name: '混合宿舍'
    },
  ],
  term_num: [
    {
      id: '1',
      name: '第一学期'
    }, {
      id: '2',
      name: '第二学期'
    }
  ],
  is_use_room: [
    {
      id: '1',
      name: '住宿'
    }, {
      id: '2',
      name: '走读'
    }
  ],
  studentStatus: [
    {
      id: '10',
      name: '正常'
    }, {
      id: '20',
      name: '毕业'
    }, {
      id: '30',
      name: '退学'
    }, {
      id: '40',
      name: '休学'
    }
  ],
  // 财务收费项目类型
  feeProjectType: [
    {
      id: '1',
      name: '学费'
    },
    {
      id: '2',
      name: '住宿费'
    },
    {
      id: '-1',
      name: '其他'
    }
  ],
  // 财务收费类型
  feeType: [
    {
      id: '1',
      name: '一次性收费'
    },
    {
      id: '2',
      name: '周期性收费'
    }
  ],
  // 财务收费周期类型
  feePeriodType: [
    {
      id: '1',
      name: '每周'
    },
    {
      id: '2',
      name: '每月'
    }
  ],
  // 项目周期
  projectTypeCycle: [
    {
      id: '1',
      name: '年度'
    },
    {
      id: '2',
      name: '月份'
    },
    {
      id: '2',
      name: '学期'
    }
  ],
  // 学期
  semester: [
    {
      id: '1',
      name: '上学期'
    },
    {
      id: '2',
      name: '下学期'
    }
  ],
  // 财务收费周期方式
  feePeriodDateType: [
    {
      id: '1',
      name: '自然周期'
    },
    {
      id: '2',
      name: '计费周期'
    }
  ],
  // 创建时间查询
  createTimeList: [
    {
      id: "1",
      name: '今天'
    },
    {
      id: "2",
      name: '昨天'
    },
    {
      id: "3",
      name: '最近七天'
    },
    {
      id: "4",
      name: '最近30天'
    },
    {
      id: "5",
      name: '本月'
    },
    {
      id: "6",
      name: '本年'
    },
    {
      id: "",
      name: '自定义时段'
    }
  ],
  // 订单状态
  statusList: [
    {
      id: "10",
      name: '待支付'
    },
    {
      id: "20",
      name: '已支付'
    },
    {
      id: "30",
      name: '已退款'
    }
  ],
  // 支付方式
  payTypeList: [
    {
      id: "1",
      name: '余额'
    },
    {
      id: "2",
      name: '微信'
    },
    {
      id: "3",
      name: '线下'
    },
    {
      id: "4",
      name: '银行'
    }
  ]
}
let mutations = {
  CLEAR_DICT(state) {
    let clearDict = ['campusList', 'schoolList', 'classList', 'schoolTreeList', 'gradeList', 'magorList', 'specialityList',
      'eduSystemList', 'roomTypeList', 'buildingList', 'roomList', 'bedList', 'agentList'];
    clearDict.forEach(e => {
      if (state[e] && state[e].length > 0) state[e] = [];
    });
  }
}
let actions = {
  clearDict({ commit }, cancel) {
    commit('CLEAR_DICT');
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}