import request from '@/utils/request';

// 获取字典列表
export function getList(data) {
    return request({
        url: `index.php?a=sxadmin&b=dm&c=getList`,
        method: 'post',
        data,
    });
}
// ID获取指定数据字典详情
export function getDmTypeInfoById(data) {
    return request({
        url: `index.php?a=sxadmin&b=dm&c=getDmTypeInfoById`,
        method: 'post',
        data,
    });
}
// 保存或修改字典信息
export function saveOrUpdate(data) {
    return request({
        url: `index.php?a=sxadmin&b=dm&c=saveDmType`,
        method: 'post',
        data,
    });
}
// 删除字典
export function delData(data) {
    return request({
        url: `index.php?a=sxadmin&b=dm&c=deleteDmType`,
        method: 'post',
        data,
    });
}
// 通过ID获取某个字段的信息
export function getInfoById(data) {
    return request({
        url: `index.php?a=sxadmin&b=dm&c=getInfoById`,
        method: 'post',
        data,
    });
}
// 保存字段
export function save(data) {
    return request({
        url: `index.php?a=sxadmin&b=dm&c=save`,
        method: 'post',
        data,
    });
}
// 删除字段
export function del(data) {
    return request({
        url: `index.php?a=sxadmin&b=dm&c=delete`,
        method: 'post',
        data,
    });
}
// 根据type_id获取字典
export async function getDmLists(typeNames = []) {
    let typeMap = {
        campus: 1, //校区  校区字典要删除 不能用字典获取校区
        family_relation: 2, //家庭成员关系
        nation: 3, //民族
        polity: 4, //政治面貌
        edu: 5, //学历
    };
    let results = {};
    for (let typeItem of typeNames) {
        let typeName = typeMap[typeItem];
        if (typeName) {
            let res = await request({
                url: `index.php?a=sxadmin&b=common&c=getDmList`,
                method: 'post',
                data: { type_id: typeName },
            });
            results[typeItem] = res.data.item;
        }
    }
    return results;
}
