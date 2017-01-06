package com.buyerologie.console.web.cms;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buyerologie.cms.model.CmsModule;
import com.buyerologie.cms.service.CmsService;
import com.buyerologie.cms.service.module.ModuleService;
import com.buyerologie.cms.service.page.PageService;
import com.buyerologie.cms.service.record.RecordService;
import com.buyerologie.cms.service.vo.ModuleVO;
import com.buyerologie.cms.service.vo.PageVO;
import com.buyerologie.cms.service.vo.RecordVO;

@Controller
public class CmsController {

    @Resource
    private CmsService    cmsService;

    @Resource
    private PageService   pageService;

    @Resource
    private ModuleService moduleService;

    @Resource
    private RecordService recordService;

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER", "ROLE_CMS_EDITOR" })
    @RequestMapping(value = { "/cms/page/edit" }, method = { RequestMethod.GET })
    public String editPage(Model model,
                           @RequestParam(required = false, defaultValue = "0") int pageId) {
        if (pageId > 0) {
            PageVO pageVO = this.pageService.getPage(pageId);
            model.addAttribute("page", pageVO);
        }
        return "cms/page/edit";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @RequestMapping(value = { "/cms/module/edit" }, method = { RequestMethod.GET })
    public String editModule(Model model, @RequestParam int pageId,
                             @RequestParam(required = false, defaultValue = "0") int moduleId) {
        if (moduleId > 0) {
            ModuleVO moduleVO = this.moduleService.getModuleVO(moduleId);
            model.addAttribute("module", moduleVO);
        }

        model.addAttribute("pageId", Integer.valueOf(pageId));

        return "cms/module/edit";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER", "ROLE_CMS_EDITOR" })
    @RequestMapping(value = { "/cms/page/list" }, method = { RequestMethod.GET })
    public String pageList(Model model) {
        List<PageVO> pageVOs = this.pageService.getPageVOs();
        model.addAttribute("pages", pageVOs);
        return "cms/page/list";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @RequestMapping(value = { "/cms/module/list" }, method = { RequestMethod.GET })
    public String moduleList(Model model, @RequestParam int pageId) {
        PageVO pageVO = this.pageService.getPage(pageId);

        model.addAttribute("page", pageVO);
        List<CmsModule> moduleTypes = this.moduleService.getModuleTypes(pageId);
        model.addAttribute("modules", moduleTypes);
        return "cms/module/list";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER" })
    @RequestMapping(value = { "/cms/record/list" }, method = { RequestMethod.GET })
    public String recordList(Model model, @RequestParam int moduleId) {
        List<RecordVO> recordVOs = this.recordService.getRecordVOs(moduleId);
        ModuleVO moduleVO = this.moduleService.getModuleVO(moduleId);
        model.addAttribute("module", moduleVO);
        model.addAttribute("records", recordVOs);
        return "cms/record/list";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_CMS_MASTER", "ROLE_CMS_EDITOR" })
    @RequestMapping(value = { "/cms/index" }, method = { RequestMethod.GET })
    public String index(Model model, @RequestParam int pageId) {
        PageVO pageVO = this.cmsService.getPageVO(pageId);

        model.addAttribute("page", pageVO);

        return "cms/index";
    }
}