package com.buyerologie.console.web.cms;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.buyerologie.cms.service.CmsService;
import com.buyerologie.cms.service.module.ModuleService;
import com.buyerologie.cms.service.page.PageService;
import com.buyerologie.cms.service.record.RecordService;
import com.buyerologie.common.vo.JsonVO;

@Controller
public class CmsApiController {

    @Resource
    private CmsService    cmsService;

    @Resource
    private PageService   pageService;

    @Resource
    private ModuleService moduleService;

    @Resource
    private RecordService recordService;

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @ResponseBody
    @RequestMapping(value = { " /api/cms/page/add" }, method = { RequestMethod.POST })
    public String addCmsPage(@RequestParam String zhName, @RequestParam String enName,
                             @RequestParam(required = false) String title,
                             @RequestParam(required = false) String description,
                             @RequestParam(required = false) String keywords,
                             @RequestParam String redirectUrl) {
        JsonVO jsonVO = new JsonVO();
        if ((StringUtils.isBlank(zhName)) || (StringUtils.isBlank(enName))) {
            jsonVO.setIsSuccess(false);
            jsonVO.setMsg("页面中文名和英文名不能为空");
            return jsonVO.toString();
        }

        this.pageService.publishPage(zhName, enName, title, description, keywords);
        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);

        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER", "ROLE_CMS_EDITOR" })
    @ResponseBody
    @RequestMapping(value = { " /api/cms/page/edit" }, method = { RequestMethod.POST })
    public String editCmsPage(@RequestParam int pageId, @RequestParam String zhName,
                              @RequestParam String enName, @RequestParam String title,
                              @RequestParam String description, @RequestParam String keywords,
                              @RequestParam String redirectUrl) {
        JsonVO jsonVO = new JsonVO();
        if ((StringUtils.isBlank(zhName)) || (StringUtils.isBlank(enName))) {
            jsonVO.setIsSuccess(false);
            jsonVO.setMsg("页面中文名和英文名不能为空");
            return jsonVO.toString();
        }

        this.pageService.editPage(pageId, zhName, enName, title, description, keywords);
        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);

        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @ResponseBody
    @RequestMapping(value = { " /api/cms/module/type/add" }, method = { RequestMethod.POST })
    public String addCmsModule(@RequestParam int pageId, @RequestParam String moduleName,
                               @RequestParam String redirectUrl) {
        JsonVO jsonVO = new JsonVO();
        if ((pageId < 0) || (StringUtils.isBlank(moduleName))) {
            jsonVO.setIsSuccess(false);
            jsonVO.setMsg("模块名不能为空");
            return jsonVO.toString();
        }

        this.cmsService.createModuleType(pageId, moduleName);
        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);

        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @ResponseBody
    @RequestMapping(value = { " /api/cms/module/type/edit" }, method = { RequestMethod.POST })
    public String editCmsModule(@RequestParam int moduleId, @RequestParam String moduleName,
                                @RequestParam String redirectUrl) {
        JsonVO jsonVO = new JsonVO();
        if ((moduleId < 0) || (StringUtils.isBlank(moduleName))) {
            jsonVO.setIsSuccess(false);
            jsonVO.setMsg("模块名不能为空");
            return jsonVO.toString();
        }

        this.cmsService.editModuleType(moduleId, moduleName);
        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);

        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @ResponseBody
    @RequestMapping(value = { "/api/cms/module/type/delete" }, method = { RequestMethod.POST })
    public String deleteCmsModule(@RequestParam int moduleId, @RequestParam String redirectUrl) {
        JsonVO jsonVO = new JsonVO();
        if (moduleId < 0) {
            jsonVO.setIsSuccess(false);
            jsonVO.setMsg("删除失败");
            return jsonVO.toString();
        }

        this.cmsService.deleteModuleType(moduleId);
        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);

        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @ResponseBody
    @RequestMapping(value = { "/api/cms/record/type/edit" }, method = { RequestMethod.POST })
    public String publishRecordType(@RequestParam int moduleId, @RequestParam int[] recordIdArr,
                                    @RequestParam String[] recordNameArr,
                                    @RequestParam String redirectUrl) {
        JsonVO jsonVO = new JsonVO();
        if ((moduleId < 0) || (recordIdArr == null) || (recordNameArr == null)
            || (recordIdArr.length != recordNameArr.length)) {
            jsonVO.setIsSuccess(false);
            jsonVO.setMsg("保存失败");
            return jsonVO.toString();
        }

        this.cmsService.publishRecordType(moduleId, recordIdArr, recordNameArr);

        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);

        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @ResponseBody
    @RequestMapping(value = { "/api/cms/record/type/delete" }, method = { RequestMethod.POST })
    public String deleteRecordType(@RequestParam int recordId, @RequestParam String redirectUrl) {
        this.cmsService.deleteRecordType(recordId);

        JsonVO jsonVO = new JsonVO();
        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);
        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @ResponseBody
    @RequestMapping(value = { "/api/cms/module/delete" }, method = { RequestMethod.POST })
    public String deleteModule(@RequestParam int moduleId, @RequestParam String redirectUrl) {
        this.cmsService.deleteModule(moduleId);

        JsonVO jsonVO = new JsonVO();
        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);
        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @ResponseBody
    @RequestMapping(value = { "/api/cms/page/delete" }, method = { RequestMethod.POST })
    public String deletePage(@RequestParam int pageId, @RequestParam String redirectUrl) {
        this.cmsService.deletePage(pageId);

        JsonVO jsonVO = new JsonVO();
        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);
        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER", "ROLE_CMS_EDITOR" })
    @ResponseBody
    @RequestMapping(value = { "/api/cms/publish" }, method = { RequestMethod.POST })
    public String publish(@RequestParam int sampleModuleId, @RequestParam int[] recordIdArr,
                          @RequestParam String[] recordValueArr,
                          @RequestParam(required = false) String[] recordNameArr,
                          @RequestParam(required = false) String[] newRecordValueArr,
                          @RequestParam String redirectUrl) {
        if ((recordValueArr == null) || (recordValueArr.length == 0)) {
            recordValueArr = new String[recordIdArr.length];
        }
        this.cmsService.modifyRecords(recordIdArr, recordValueArr);

        if ((recordNameArr != null) && (newRecordValueArr != null)
            && (newRecordValueArr.length == 0)) {
            newRecordValueArr = new String[] { "" };
        }

        this.cmsService.createRecords(sampleModuleId, recordNameArr, newRecordValueArr);
        JsonVO jsonVO = new JsonVO();
        jsonVO.setIsSuccess(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);
        return jsonVO.toString();
    }
}