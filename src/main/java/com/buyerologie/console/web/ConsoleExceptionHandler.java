package com.buyerologie.console.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import com.buyerologie.common.vo.JsonVO;
import com.buyerologie.core.spring.mvc.ExceptionHandler;

@Component("ExceptionHandler")
public class ConsoleExceptionHandler implements ExceptionHandler {

    private static final Logger logger = Logger.getLogger(ConsoleExceptionHandler.class);

    /*
     (non-Javadoc)
     * @see com.yunjee.mvc.spring.ExceptionHandler#resolveSyncException(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Exception)
     */
    @Override
    public ModelAndView resolveSyncException(HttpServletRequest request,
                                             HttpServletResponse response, Exception exception) {

        logger.error("", exception);
        ModelAndView modelAndView = new ModelAndView();

        if (exception instanceof AccessDeniedException) {
            modelAndView.setViewName("redirect:/");
        }
        //            if (exception instanceof BizException) {
        //                logError(exception);
        //                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        //                modelAndView.setViewName("/error/50x");
        //                modelAndView.addObject("msg", exception.getMessage());
        //                return modelAndView;
        //            }
        //            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        //            modelAndView.setViewName("/error/404");

        return modelAndView;

    }

    /*
     (non-Javadoc)
     * @see com.yunjee.mvc.spring.ExceptionHandler#resolveAsyncException(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Exception)
     */
    @Override
    public String resolveAsyncException(HttpServletRequest request, HttpServletResponse response,
                                        Exception exception) {
        logger.error("", exception);

        JsonVO jsonVO = new JsonVO();
        jsonVO.setIsSuccess(false);
        jsonVO.setMsg(exception.getMessage());
        return jsonVO.toString();
        //
        //        if (exception instanceof AccessDeniedException) {
        //            Map<String, Object> jsonMap = new HashMap<String, Object>();
        //            StringBuffer redirectURL = new StringBuffer();
        //            //获取登录跳转URL
        //            String scheme = request.getScheme();
        //            String serverName = request.getServerName();
        //            int serverPort = request.getServerPort();
        //
        //            String servletPath = request.getServletPath();
        //            String service = scheme + "://" + serverName;
        //
        //            if (serverPort != 80) {
        //                service = service + ":" + serverPort;
        //            }
        //            try {
        //                redirectURL.append(SSOUtil.LOGIN_SERVER_NAME).append("?service=")
        //                    .append(URLEncoder.encode(service, "utf8")).append("&loginRedirectUri=")
        //                    .append(URLEncoder.encode(servletPath, "utf8"));
        //            } catch (UnsupportedEncodingException e) {
        //                logger.error("", e);
        //            }
        //            jsonMap.put("isSuccess", 0);
        //            jsonMap.put("isRedirect", 1);
        //            jsonMap.put("redirectURL", redirectURL.toString());
        //            return new Gson().toJson(jsonMap);
        //        } else {

    }

}
