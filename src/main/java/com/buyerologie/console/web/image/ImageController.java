package com.buyerologie.console.web.image;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.buyerologie.console.utils.FileUploadUtils;

@Controller
public class ImageController {

    @RequestMapping(value = { "/imageUpload" }, method = { org.springframework.web.bind.annotation.RequestMethod.GET })
    public String image() {
        return "image/upload";
    }

    @ResponseBody
    @RequestMapping(value = "/api/image/ckeditor/upload", method = RequestMethod.POST)
    public String upload(Model model, @RequestParam MultipartFile upload,
                         @RequestParam String CKEditorFuncNum, HttpServletRequest request,
                         HttpServletResponse response) {

        if (upload == null) {
            return "";
        }
        response.setHeader("X-Frame-Options", "SAMEORIGIN");

        String image = FileUploadUtils.uploadImage(upload);

        StringBuilder returnBuilder = new StringBuilder();
        // 返回"图像"选项卡并显示图片  request.getContextPath()为web项目名   
        returnBuilder.append("<script type=\"text/javascript\">");
        returnBuilder.append("window.parent.CKEDITOR.tools.callFunction(" + CKEditorFuncNum + ",'"
                             + request.getContextPath() + image + "','')");
        returnBuilder.append("</script>");
        return returnBuilder.toString();
    }

    @RequestMapping(value = { "/api/image/upload" }, method = RequestMethod.POST)
    public String upload(Model model, @RequestParam MultipartFile[] imageFile) {
        String image = "";
        if (imageFile == null) {
            return "image/upload";
        }

        List<String> imageList = new ArrayList<>();

        for (int i = 0; i < imageFile.length; i++) {
            image = FileUploadUtils.uploadImage(imageFile[i]);
            imageList.add(image);
        }

        model.addAttribute("imageList", imageList);
        return "image/upload";
    }
}