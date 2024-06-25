import request from '@/utils/request'

export function getRoleList(data) {
    if (!data) {
        data = {
            platform_type: 1
        }
    }
    let url = `index.php?a=sxadmin&b=common&c=getRoleList`;
    if (data.platform_type == 2) {
        // 子后台要传school_id学校ID
        url = `index.php?a=sxadmin&b=common&c=getAgentRoleList`;
    }
    return request({
        url: url,
        method: 'post',
        data
    })
}
