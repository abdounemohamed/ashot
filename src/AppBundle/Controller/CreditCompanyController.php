<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Page;
use AppBundle\Entity\CreditCompany;
use AppBundle\Entity\ArmRegion;
use AppBundle\Entity\ArmAdministrative;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class CreditCompanyController extends Controller
{
    /**
     * @Route("/{_locale}/credit-companies", name="credit_company_list", requirements={
     *         "_locale": "hy|en"
     *     })
     */
    public function listAction(Request $request)
    {
        $url = 'https://' . $_SERVER['HTTP_HOST'];
        switch ($url){
            case "https://bankinfo.am":
                $keyUrl = "2750e06e-5624-4948-89e9-0fb19e4bad0e";    //Armsatosh3
                break;
            case "https://binfo.am":
                $keyUrl = "604843ec-5fc1-4c1b-8728-2bbbcfc8957c";    //4
                break;
            case "https://www.bankinfo.am":
                $keyUrl = "21386d59-c7f5-46a1-9ca4-23231848490a";    //5
                break;
            case "https://www.binfo.am":
                $keyUrl = "4f085827-5143-41f4-8ba2-01a27ce36dcf";    //6
                break;
           
        }
        $locale = $request->getLocale();
        $manager = $this->getDoctrine()->getManager();
        
        $repositoryCreditCompanies = $manager->getRepository('AppBundle:CreditCompany');
        $cerditCompanies = $repositoryCreditCompanies->findAll();
        
        $repositoryPages = $manager->getRepository('AppBundle:Page');
        $page = $repositoryPages->findOneByPageSlug('credit-companies');
        
        foreach($cerditCompanies as $cerditCompany){
            $cerditCompany->setLocale($locale);
            $manager->refresh($cerditCompany);
        }
        
        $page->setLocale($locale);
        $manager->refresh($page);
        
        // replace this example code with whatever you need
        return $this->render('credit-company/list.html.twig', array(
            'page' => $page,
            'creditCompanies' => $cerditCompanies,
            'Url' => $keyUrl
        ));
    }
    
}
