package com.buyerologie.console.utils;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;

import org.apache.log4j.Logger;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.buyerologie.utils.ClassLoaderUtil;
import com.buyerologie.utils.UUIDUtils;

public class FileUploadUtils {

    private static final Logger logger                   = Logger.getLogger(FileUploadUtils.class);

    private static final String ROOT_PATH                = "buyerology";
    private static final String DEFALUT_LINUX_IMAGE_ROOT = ROOT_PATH + "/image/";

    private static final String UPPER_PATH               = "../";

    private static String getRootPath(int deepth) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < deepth; i++) {
            stringBuilder.append(UPPER_PATH);
        }
        return stringBuilder.toString();
    }

    private static String getImageFileRootPath() {
        String path;
        File file = null;
        try {
            path = ClassLoaderUtil.getExtendResource("/").getPath();
            int pathSplitLen = path.split("/").length;

            String rootPath = ClassLoaderUtil.getExtendResource(getRootPath(pathSplitLen - 1))
                .getPath();

            file = new File(rootPath + DEFALUT_LINUX_IMAGE_ROOT);
        } catch (MalformedURLException e) {
            logger.error("", e);
        }
        if (!file.exists()) {
            file.mkdirs();
        }
        return file.getPath();
    }

    public static String uploadImage(MultipartFile multipartFile) {
        byte[] fileBytes = null;
        try {
            fileBytes = multipartFile.getBytes();
        } catch (IOException e) {
            logger.error("", e);
        }

        String filePath = getImageFileRootPath() + "/" + UUIDUtils.getUUID()
                          + multipartFile.getOriginalFilename();

        logger.info("文件路径为: " + filePath);
        File file = new File(filePath);
        file.setWritable(true, false);
        try {
            FileCopyUtils.copy(fileBytes, file);
        } catch (IOException e) {
            logger.error("", e);
        }
        return filePath.replace(ROOT_PATH, "");
    }
}
